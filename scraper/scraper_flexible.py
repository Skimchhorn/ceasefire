"""
Alternative solution if DB_HOSTADDR is not available.
This modifies the connection to work without forcing IPv4.
"""

import os
import sys
import time
import socket
from typing import Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

import psycopg2
from psycopg2 import OperationalError
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By


print("🚀 Starting Ukraine Articles Scraper (IPv4/IPv6 Flexible)")
print("=" * 50)


def validate_db_credentials():
    """Validate all required database credentials are present."""
    required = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"]
    missing = [var for var in required if not os.getenv(var)]
    
    if missing:
        print(f"❌ Missing required environment variables: {', '.join(missing)}")
        sys.exit(1)
    
    print("✅ All required database credentials present")


def connect_to_database_flexible(max_retries=5):
    """Connect to PostgreSQL with flexible IPv4/IPv6 support."""
    
    validate_db_credentials()
    
    # Build connection kwargs
    db_kwargs = {
        "dbname": os.getenv("DB_NAME"),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
        "host": os.getenv("DB_HOST"),
        "port": os.getenv("DB_PORT", "5432"),
    }
    
    # SSL mode
    sslmode = os.getenv("DB_SSLMODE", "require")
    db_kwargs["sslmode"] = sslmode
    print(f"🔒 Using SSL mode: {sslmode}")
    
    # Try with DB_HOSTADDR if provided, otherwise try both IPv4 and IPv6
    hostaddr = os.getenv("DB_HOSTADDR")
    
    if hostaddr:
        db_kwargs["hostaddr"] = hostaddr
        print(f"✅ Using provided DB_HOSTADDR: {hostaddr}")
    else:
        print("⚠️  DB_HOSTADDR not set - will try IPv4 first, then IPv6")
    
    # Connect with retry logic
    print(f"\n🔌 Connecting to database...")
    
    for attempt in range(1, max_retries + 1):
        # Try IPv4 first if no hostaddr provided
        if not hostaddr and attempt == 1:
            try:
                print(f"   Attempt {attempt}/{max_retries} (trying IPv4)...", end=" ")
                ipv4_addrs = socket.getaddrinfo(
                    db_kwargs["host"], 
                    None, 
                    socket.AF_INET, 
                    socket.SOCK_STREAM
                )
                if ipv4_addrs:
                    temp_kwargs = db_kwargs.copy()
                    temp_kwargs["hostaddr"] = ipv4_addrs[0][4][0]
                    conn = psycopg2.connect(**temp_kwargs)
                    print("✅ Connected via IPv4!")
                    return conn
            except Exception as e:
                print(f"❌ IPv4 failed: {str(e)[:50]}...")
        
        # Standard connection attempt
        try:
            print(f"   Attempt {attempt}/{max_retries}...", end=" ")
            conn = psycopg2.connect(**db_kwargs)
            print("✅ Connected!")
            return conn
            
        except OperationalError as e:
            error_msg = str(e)
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
                print("🔍 Solutions:")
                print("   1. Add DB_HOSTADDR secret with IPv4 address")
                print("   2. Check if database allows connections from GitHub Actions")
                print("   3. Verify your database provider supports IPv4 connections")
                sys.exit(1)


# Connect to database
conn = connect_to_database_flexible()
cur = conn.cursor()
print("✅ Database connection established\n")

# Rest of the scraper code...
# (Same as scraper.py)
