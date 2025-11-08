import os, time, socket
from dotenv import load_dotenv
import psycopg2
from psycopg2 import OperationalError
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

load_dotenv()  # OK to keep if you still write a .env locally

def resolve_ipv4(host: str) -> str | None:
    try:
        infos = socket.getaddrinfo(host, None, family=socket.AF_INET, type=socket.SOCK_STREAM)
        # (family, type, proto, canonname, sockaddr) -> sockaddr[0] is IPv4 string
        return infos[0][4][0] if infos else None
    except Exception:
        return None

# Build connection kwargs
db_kwargs = dict(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),           # keep DNS name for TLS identity
    port=os.getenv("DB_PORT", "5432"),
)

# Optional SSL (many cloud DBs require it)
sslmode = os.getenv("DB_SSLMODE", "require")
if sslmode:
    db_kwargs["sslmode"] = sslmode

# Prefer explicit IPv4 if provided; otherwise try to resolve one
hostaddr = os.getenv("DB_HOSTADDR") or resolve_ipv4(db_kwargs["host"])
if hostaddr:
    db_kwargs["hostaddr"] = hostaddr  # psycopg/libpq will connect via IPv4 but validate against `host`

# Robust connect (handles brief DNS/network hiccups)
conn = None
for attempt in range(1, 6):
    try:
        conn = psycopg2.connect(**db_kwargs)
        break
    except OperationalError as e:
        if attempt == 5:
            print("Database connection failed:", e)
            raise
        time.sleep(2 * attempt)

cur = conn.cursor()

# ---- Selenium setup (CI-friendly headless) ----
options = Options()
options.add_argument("--headless=new")         # new headless mode
options.add_argument("--no-sandbox")           # needed in CI
options.add_argument("--disable-dev-shm-usage")# avoid /dev/shm issues
driver = webdriver.Chrome(options=options)

# ---- Scrape ----
driver.get("https://www.rescue.org/topic/war-ukraine")
time.sleep(3)

titles = [e.text.strip() for e in driver.find_elements(By.TAG_NAME, "h3") if e.text.strip()]

# ---- Insert into DB ----
cur.execute("""
CREATE TABLE IF NOT EXISTS war_articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  created_at TIMESTAMP DEFAULT now()
);
""")
for title in titles:
    cur.execute("INSERT INTO war_articles (title) VALUES (%s)", (title,))

conn.commit()
cur.close()
conn.close()
driver.quit()
