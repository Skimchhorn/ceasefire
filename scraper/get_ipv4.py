#!/usr/bin/env python3
"""
Helper script to find the IPv4 address of your database host.
Run this to get the value for DB_HOSTADDR secret.
"""

import os
import socket
from dotenv import load_dotenv

load_dotenv()

print("=" * 60)
print("🔍 Database IPv4 Address Finder")
print("=" * 60)
print()

db_host = os.getenv('DB_HOST')

if not db_host:
    print("❌ DB_HOST not found in .env file")
    print()
    print("Please create a .env file with your database credentials:")
    print("DB_HOST=your-database-hostname.com")
    exit(1)

print(f"Database Host: {db_host}")
print()

# Try to resolve IPv4
try:
    print("Resolving IPv4 address...")
    result = socket.getaddrinfo(db_host, None, socket.AF_INET, socket.SOCK_STREAM)
    ipv4 = result[0][4][0]
    
    print(f"✅ IPv4 Address Found: {ipv4}")
    print()
    print("=" * 60)
    print("📋 NEXT STEP: Add this as a GitHub Secret")
    print("=" * 60)
    print()
    print("1. Go to: https://github.com/Skimchhorn/ceasefire/settings/secrets/actions")
    print("2. Click 'New repository secret'")
    print("3. Name: DB_HOSTADDR")
    print(f"4. Value: {ipv4}")
    print("5. Click 'Add secret'")
    print()
    print("Then re-run your GitHub Action workflow!")
    print("=" * 60)
    
except socket.gaierror as e:
    print(f"❌ Could not resolve hostname: {e}")
    print()
    print("=" * 60)
    print("🔧 CLOUD DATABASE PROVIDERS")
    print("=" * 60)
    print()
    print("If you're using a cloud database, find the IPv4 address here:")
    print()
    print("📌 Supabase:")
    print("   - Project Settings → Database → Connection Pooling")
    print("   - Look for 'Host' - use the pooler address")
    print("   - Or check Connection String and extract the host")
    print()
    print("📌 Neon:")
    print("   - Dashboard → Connection Details")
    print("   - Use the endpoint hostname")
    print()
    print("📌 Railway:")
    print("   - Database → Connect → Public Networking")
    print("   - Use the host from connection string")
    print()
    print("📌 Render:")
    print("   - Database → Info → External Database URL")
    print("   - Extract hostname and resolve it")
    print()
    print("📌 AWS RDS / DigitalOcean / Other:")
    print("   - Find the endpoint in your provider's console")
    print("   - Run: nslookup your-endpoint.amazonaws.com")
    print("   - Use the IP address shown")
    print()
    print("=" * 60)

except Exception as e:
    print(f"❌ Unexpected error: {e}")
    exit(1)
