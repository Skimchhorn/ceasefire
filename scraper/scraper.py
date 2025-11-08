import time
import os
import sys
import psycopg2

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# Only load .env in local development (not in CI)
if os.path.exists('.env'):
    from dotenv import load_dotenv
    load_dotenv()

# PostgreSQL connection with retry logic and IPv4 enforcement
def connect_to_db(max_retries=3, backoff_factor=2):
    """
    Connect to PostgreSQL with retry logic and IPv4 enforcement.
    
    Args:
        max_retries: Number of connection attempts
        backoff_factor: Multiplier for exponential backoff (seconds)
    
    Returns:
        tuple: (connection, cursor) or exits on failure
    """
    db_host = os.getenv("DB_HOST")
    db_hostaddr = os.getenv("DB_HOSTADDR")  # IPv4 address to force IPv4 connection
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_sslmode = os.getenv("DB_SSLMODE", "require")
    
    # Validation
    if not all([db_host, db_name, db_user, db_password]):
        print("❌ Missing required database credentials (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD)")
        sys.exit(1)
    
    # Build connection parameters
    conn_params = {
        "dbname": db_name,
        "user": db_user,
        "password": db_password,
        "port": db_port,
        "sslmode": db_sslmode,
    }
    
    # Force IPv4 if hostaddr is provided (recommended for CI)
    if db_hostaddr:
        print(f"🔧 Forcing IPv4 connection to {db_hostaddr}")
        conn_params["host"] = db_host
        conn_params["hostaddr"] = db_hostaddr
    else:
        print(f"⚠️  No DB_HOSTADDR provided, using DNS resolution for {db_host}")
        conn_params["host"] = db_host
    
    # Retry logic
    for attempt in range(1, max_retries + 1):
        try:
            print(f"🔌 Connecting to database (attempt {attempt}/{max_retries})...")
            conn = psycopg2.connect(**conn_params)
            cur = conn.cursor()
            print("✅ Database connection successful!")
            return conn, cur
        except psycopg2.OperationalError as e:
            error_msg = str(e)
            # Sanitize error message to avoid leaking password
            if db_password and db_password in error_msg:
                error_msg = error_msg.replace(db_password, "***")
            
            print(f"❌ Connection attempt {attempt} failed: {error_msg}")
            
            if attempt < max_retries:
                wait_time = backoff_factor ** attempt
                print(f"⏳ Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print(f"💥 All {max_retries} connection attempts failed")
                print("🔍 Troubleshooting tips:")
                print("   - Verify DB_HOST and DB_HOSTADDR are correct")
                print("   - Check if database allows connections from GitHub Actions IPs")
                print("   - Ensure DB_SSLMODE matches your provider's requirements")
                sys.exit(1)
        except Exception as e:
            print(f"❌ Unexpected database error: {e}")
            sys.exit(1)

# Connect to database
conn, cur = connect_to_db()

# Setup Chrome for GitHub Actions (headless with required flags)
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")  # Required for running as root in containers
options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems
options.add_argument("--disable-gpu")  # Applicable to Windows/Linux
options.add_argument("--window-size=1920,1080")  # Set viewport size

try:
    print("🌐 Starting Chrome WebDriver...")
    driver = webdriver.Chrome(options=options)
    print("✅ Chrome WebDriver started successfully")
except Exception as e:
    print(f"❌ Failed to start Chrome WebDriver: {e}")
    print("💡 Ensure chromedriver is installed and in PATH")
    cur.close()
    conn.close()
    sys.exit(1)

# Scrape with error handling
try:
    print("🔍 Navigating to rescue.org...")
    driver.get("https://www.rescue.org/topic/war-ukraine")
    time.sleep(3)

    articles = driver.find_elements(By.TAG_NAME, "h3")
    titles = [a.text.strip() for a in articles if a.text.strip()]

    print(f"📰 Scraped {len(titles)} Articles:")
    for i, title in enumerate(titles, start=1): 
        print(f"{i}. {title}")
    
    if not titles:
        print("⚠️  Warning: No articles found. The website structure may have changed.")
except Exception as e:
    print(f"❌ Scraping failed: {e}")
    driver.quit()
    cur.close()
    conn.close()
    sys.exit(1)
    
# Insert into DB
# cur.execute("CREATE TABLE IF NOT EXISTS war_articles (id SERIAL PRIMARY KEY, title TEXT, created_at TIMESTAMP DEFAULT now());")

# for title in titles:
#     cur.execute("INSERT INTO war_articles (title) VALUES (%s)", (title,))

conn.commit()
cur.close()
conn.close()
driver.quit()
