import time
from dotenv import load_dotenv
import os
import psycopg2

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
load_dotenv()  # Load from .env

# PostgreSQL connection
try:
    conn = psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT", "5432")
    )
    cur = conn.cursor()
except Exception as e:
    print("Database connection failed:", e)
    exit(1)

# Setup Chrome
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

# Scrape
driver.get("https://www.rescue.org/topic/war-ukraine")
time.sleep(3)

articles = driver.find_elements(By.TAG_NAME, "h3")
titles = [a.text.strip() for a in articles if a.text.strip()]

# Insert into DB
cur.execute("CREATE TABLE IF NOT EXISTS war_articles (id SERIAL PRIMARY KEY, title TEXT, created_at TIMESTAMP DEFAULT now());")

for title in titles:
    cur.execute("INSERT INTO war_articles (title) VALUES (%s)", (title,))

conn.commit()
cur.close()
conn.close()
driver.quit()
