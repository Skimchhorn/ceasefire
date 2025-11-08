#!/usr/bin/env python3
"""
Quick test to verify Supabase pooler connection works.
Run this before pushing to GitHub to ensure everything is configured correctly.
"""

import os
import sys

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  python-dotenv not installed, using environment variables")

import psycopg2

print("=" * 60)
print("🧪 Testing Supabase Session Pooler Connection")
print("=" * 60)

# Get credentials
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT", "5432")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

print(f"\nHost: {db_host}")
print(f"Port: {db_port}")
print(f"Database: {db_name}")
print(f"User: {db_user}")
print(f"SSL Mode: require")

# Check if it's the pooler
if "pooler.supabase.com" in (db_host or ""):
    print("✅ Using Supabase Session Pooler (IPv4 compatible)")
else:
    print("⚠️  Not using Supabase pooler")

print("\n" + "=" * 60)

# Validate
if not all([db_host, db_name, db_user, db_password]):
    print("❌ Missing required environment variables!")
    print("Please update your .env file with your database password")
    sys.exit(1)

if db_password == "REPLACE_WITH_YOUR_PASSWORD":
    print("❌ Please update DB_PASSWORD in .env file!")
    sys.exit(1)

# Test connection
try:
    print("\n🔌 Attempting connection...")
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password,
        sslmode="require"
    )
    
    print("✅ CONNECTION SUCCESSFUL!")
    
    # Test query
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()[0]
    print(f"\n✅ PostgreSQL Version: {version[:60]}...")
    
    # Check if table exists
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'war_articles'
        );
    """)
    table_exists = cur.fetchone()[0]
    
    if table_exists:
        cur.execute("SELECT COUNT(*) FROM war_articles;")
        count = cur.fetchone()[0]
        print(f"✅ Table 'war_articles' exists with {count} records")
    else:
        print("ℹ️  Table 'war_articles' doesn't exist yet (will be created on first run)")
    
    cur.close()
    conn.close()
    
    print("\n" + "=" * 60)
    print("✅ All tests passed!")
    print("\n📋 Next steps:")
    print("1. Update these exact values in GitHub Secrets:")
    print(f"   DB_HOST = {db_host}")
    print(f"   DB_PORT = {db_port}")
    print(f"   DB_NAME = {db_name}")
    print(f"   DB_USER = {db_user}")
    print(f"   DB_PASSWORD = (your password)")
    print(f"   DB_SSLMODE = require")
    print("\n2. You do NOT need DB_HOSTADDR with pooler!")
    print("\n3. Push your code and run GitHub Actions")
    print("=" * 60)
    
except psycopg2.OperationalError as e:
    print(f"\n❌ CONNECTION FAILED!")
    print(f"\nError: {e}")
    print("\n🔍 Troubleshooting:")
    print("   1. Check your DB_PASSWORD in .env file")
    print("   2. Verify you're using the pooler host (aws-1-ca-central-1.pooler.supabase.com)")
    print("   3. Confirm SSL is enabled in Supabase settings")
    print("   4. Check Supabase dashboard for any service issues")
    sys.exit(1)
    
except Exception as e:
    print(f"\n❌ Unexpected error: {e}")
    sys.exit(1)
