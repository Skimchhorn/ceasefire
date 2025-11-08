import os
import sys
import time
import socket
from typing import Optional

# Only load .env in local development (not required in CI)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv not installed in CI, that's fine

import psycopg2
from psycopg2 import OperationalError
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By


print("🚀 Starting Ukraine Articles Scraper")
print("=" * 50)

def resolve_ipv4(host: str) -> Optional[str]:
    """Resolve hostname to IPv4 address."""
    try:
        infos = socket.getaddrinfo(host, None, family=socket.AF_INET, type=socket.SOCK_STREAM)
        ipv4 = infos[0][4][0] if infos else None
        if ipv4:
            print(f"✅ Resolved {host} to IPv4: {ipv4}")
        return ipv4
    except Exception as e:
        print(f"⚠️  Could not resolve {host} to IPv4: {e}")
        return None


def validate_db_credentials():
    """Validate all required database credentials are present."""
    required = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"]
    missing = [var for var in required if not os.getenv(var)]
    
    if missing:
        print(f"❌ Missing required environment variables: {', '.join(missing)}")
        sys.exit(1)
    
    print("✅ All required database credentials present")


def connect_to_database(max_retries=5):
    """Connect to PostgreSQL with retry logic and IPv4 enforcement."""
    
    # Validate credentials first
    validate_db_credentials()
    
    # Build connection kwargs
    db_host = os.getenv("DB_HOST")
    db_kwargs = {
        "dbname": os.getenv("DB_NAME"),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
        "host": db_host,
        "port": os.getenv("DB_PORT", "5432"),
    }
    
    # SSL mode (most cloud DBs require this)
    sslmode = os.getenv("DB_SSLMODE", "require")
    db_kwargs["sslmode"] = sslmode
    print(f"🔒 Using SSL mode: {sslmode}")
    
    # Check if using Supabase pooler (which supports IPv4 natively)
    is_supabase_pooler = "pooler.supabase.com" in db_host
    
    if is_supabase_pooler:
        print(f"✅ Detected Supabase Connection Pooler - IPv4 supported natively!")
        print(f"   Host: {db_host}")
        # Pooler resolves to IPv4 automatically, no need for hostaddr
    else:
        # Force IPv4 connection for direct connections
        hostaddr = os.getenv("DB_HOSTADDR")
        if not hostaddr:
            print("⚠️  DB_HOSTADDR not set, attempting to resolve IPv4...")
            hostaddr = resolve_ipv4(db_host)
        else:
            print(f"✅ Using provided DB_HOSTADDR: {hostaddr}")
        
        if hostaddr:
            db_kwargs["hostaddr"] = hostaddr
            print(f"🔧 Forcing IPv4 connection via hostaddr: {hostaddr}")
        else:
            print("⚠️  No IPv4 address available, will try DNS resolution (may fail on IPv6-only hosts)")
    
    # Connect with retry logic
    print(f"\n🔌 Connecting to database...")
    conn = None
    
    for attempt in range(1, max_retries + 1):
        try:
            print(f"   Attempt {attempt}/{max_retries}...", end=" ")
            conn = psycopg2.connect(**db_kwargs)
            print("✅ Connected!")
            return conn
            
        except OperationalError as e:
            error_msg = str(e)
            # Sanitize password from error messages
            if db_kwargs["password"] and db_kwargs["password"] in error_msg:
                error_msg = error_msg.replace(db_kwargs["password"], "***")
            
            print(f"❌ Failed")
            print(f"   Error: {error_msg}")
            
            if attempt < max_retries:
                wait_time = 2 * attempt
                print(f"   ⏳ Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print(f"\n💥 All {max_retries} connection attempts failed")
                print("🔍 Troubleshooting:")
                print("   - Verify DB_HOST and DB_HOSTADDR are correct")
                print("   - Check firewall/security group allows GitHub Actions IPs")
                print("   - Ensure database is online and accepting connections")
                print(f"   - Verify SSL mode '{sslmode}' matches your provider")
                sys.exit(1)
        
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            sys.exit(1)


# Connect to database
conn = connect_to_database()
cur = conn.cursor()
print("✅ Database connection established\n")

# ---- Selenium setup (CI-friendly headless) ----
print("🌐 Setting up Chrome WebDriver...")
options = Options()
options.add_argument("--headless=new")          # Modern headless mode
options.add_argument("--no-sandbox")            # Required in containerized environments
options.add_argument("--disable-dev-shm-usage") # Overcome limited resource problems
options.add_argument("--disable-gpu")           # Disable GPU acceleration
options.add_argument("--disable-extensions")    # Disable extensions
options.add_argument("--window-size=1920,1080") # Set viewport size
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

try:
    driver = webdriver.Chrome(options=options)
    print("✅ Chrome WebDriver initialized successfully\n")
except Exception as e:
    print(f"❌ Failed to initialize Chrome WebDriver: {e}")
    print("💡 Ensure Chrome and chromedriver are installed")
    cur.close()
    conn.close()
    sys.exit(1)

# ---- Scrape ----
print("🔍 Scraping articles from rescue.org...")
try:
    driver.get("https://www.rescue.org/topic/war-ukraine")
    print("✅ Page loaded successfully")
    time.sleep(3)  # Wait for dynamic content

    articles = driver.find_elements(By.TAG_NAME, "h3")
    titles = [e.text.strip() for e in articles if e.text.strip()]
    
    print(f"📰 Found {len(titles)} articles:")
    for i, title in enumerate(titles, 1):
        print(f"   {i}. {title[:80]}{'...' if len(title) > 80 else ''}")
    
    if not titles:
        print("⚠️  Warning: No articles found. Website structure may have changed.")
    
except Exception as e:
    print(f"❌ Scraping failed: {e}")
    driver.quit()
    cur.close()
    conn.close()
    sys.exit(1)

# ---- Insert into DB ----
print(f"\n💾 Inserting {len(titles)} articles into database...")
try:
    # Create table if not exists
    cur.execute("""
        CREATE TABLE IF NOT EXISTS war_articles (
            id SERIAL PRIMARY KEY,
            title TEXT UNIQUE,
            created_at TIMESTAMP DEFAULT now()
        );
    """)
    print("✅ Table 'war_articles' ready")
    
    # Insert articles (skip duplicates)
    inserted = 0
    skipped = 0
    
    for title in titles:
        try:
            cur.execute(
                "INSERT INTO war_articles (title) VALUES (%s) ON CONFLICT (title) DO NOTHING",
                (title,)
            )
            if cur.rowcount > 0:
                inserted += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"⚠️  Error inserting '{title[:50]}...': {e}")
    
    conn.commit()
    print(f"✅ Inserted {inserted} new articles")
    if skipped > 0:
        print(f"ℹ️  Skipped {skipped} duplicate articles")
    
except Exception as e:
    print(f"❌ Database operation failed: {e}")
    conn.rollback()
    driver.quit()
    cur.close()
    conn.close()
    sys.exit(1)

# ---- Cleanup ----
print("\n🧹 Cleaning up...")
cur.close()
conn.close()
driver.quit()

print("=" * 50)
print("✅ Scraper completed successfully!")
print(f"📊 Summary: {inserted} new, {skipped} duplicates, {len(titles)} total found")
