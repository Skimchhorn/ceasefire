# Ukraine Articles Scraper

Automated web scraper that collects humanitarian articles from rescue.org and stores them in PostgreSQL.

## 🔧 Setup

### Required GitHub Secrets

Add these secrets in your repository settings (`Settings > Secrets and variables > Actions`):

| Secret | Description | Example |
|--------|-------------|---------|
| `DB_HOST` | Database hostname (DNS name) | `db.example.com` or `aws-0-us-east-1.pooler.supabase.com` |
| `DB_HOSTADDR` | **IPv4 address** of database | `34.123.45.67` (forces IPv4 connection) |
| `DB_PORT` | Database port | `5432` (default PostgreSQL port) |
| `DB_NAME` | Database name | `postgres` or `my_database` |
| `DB_USER` | Database username | `postgres` or `db_user` |
| `DB_PASSWORD` | Database password | `your_secure_password` |
| `DB_SSLMODE` | SSL mode (optional) | `require` (default if not set) |

### How to Get DB_HOSTADDR (IPv4 Address)

The `DB_HOSTADDR` is critical for avoiding IPv6 connection issues on GitHub Actions runners.

**Option 1: Using `dig` or `nslookup`**
```bash
# On Linux/Mac
dig +short A your-db-hostname.com

# On Windows
nslookup your-db-hostname.com
```

**Option 2: Using Python**
```python
import socket
host = "your-db-hostname.com"
ipv4 = socket.getaddrinfo(host, None, socket.AF_INET)[0][4][0]
print(f"IPv4: {ipv4}")
```

**For Cloud Providers:**
- **Supabase**: Check your project settings for the pooler IPv4 address
- **Neon**: Use the connection string's host and resolve it
- **Railway**: Check the database connection details
- **Render**: Find the external database URL's IP

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   cd scraper
   pip install -r requirements.txt
   ```

2. **Create `.env` file:**
   ```env
   DB_HOST=your-db-hostname.com
   DB_HOSTADDR=34.123.45.67
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_SSLMODE=require
   ```

3. **Run the scraper:**
   ```bash
   python scraper.py
   ```

## 🤖 GitHub Actions Workflow

The scraper runs automatically:
- **Schedule**: Every 12 hours (00:00 and 12:00 UTC)
- **Manual**: Via "Actions" tab → "Scrape Ukraine Articles" → "Run workflow"

### Workflow Features

✅ **IPv4 Enforcement** - Forces IPv4 connections to avoid IPv6 issues  
✅ **SSL/TLS Support** - Secure connections to cloud databases  
✅ **Retry Logic** - Handles transient network failures  
✅ **Chrome Headless** - Full Selenium support with proper flags  
✅ **Diagnostic Logging** - Detailed output without exposing secrets  
✅ **Duplicate Prevention** - UNIQUE constraint prevents duplicate articles  
✅ **Dependency Caching** - Faster workflow runs

## 🐛 Troubleshooting

### "could not translate host name to address"

**Cause**: DNS resolution failure or IPv6-only hostname  
**Fix**: Ensure `DB_HOSTADDR` secret is set with the IPv4 address

### "Network is unreachable" (IPv6 error)

**Cause**: GitHub runners prefer IPv6 but have limited IPv6 connectivity  
**Fix**: The `DB_HOSTADDR` secret forces IPv4 connection

### "SSL connection has been closed unexpectedly"

**Cause**: Database requires SSL but `sslmode` is not set  
**Fix**: Set `DB_SSLMODE=require` secret or verify your provider's SSL requirements

### "Connection refused"

**Cause**: Database firewall blocking GitHub Actions IPs  
**Fix**: 
- For Supabase: Use the pooler connection (port 6543 with transaction mode)
- For other providers: Allow connections from GitHub Actions IP ranges
- Check your database's firewall/security group settings

### Chrome/ChromeDriver errors

**Cause**: Chrome installation or compatibility issues  
**Fix**: The workflow now uses `browser-actions/setup-chrome@v1` which handles installation

## 📊 Database Schema

```sql
CREATE TABLE war_articles (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE,           -- Prevents duplicates
    created_at TIMESTAMP DEFAULT now()
);
```

## 🔍 Verification Checklist

After setting up secrets, verify:

1. ✅ All 7 secrets are configured in GitHub
2. ✅ `DB_HOSTADDR` contains an IPv4 address (not hostname)
3. ✅ Database allows connections from external IPs
4. ✅ SSL mode matches your database provider's requirements
5. ✅ Test manually: Actions → Scrape Ukraine Articles → Run workflow
6. ✅ Check workflow logs for "✅ Connected!" message

## 📝 Notes

- **Cron times are UTC**: Adjust the cron expression if you need specific local times
- **Rate limiting**: The scraper includes a 3-second delay to be respectful to rescue.org
- **Duplicates**: Articles with identical titles are automatically skipped
- **Secrets security**: GitHub automatically masks secret values in logs
