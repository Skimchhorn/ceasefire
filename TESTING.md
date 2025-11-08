# Testing the Scraper Locally

Before deploying to GitHub Actions, test the scraper on your local machine.

## 🚀 Quick Start (Recommended)

### 1. Create your `.env` file

```bash
# Copy the example file
cp scraper/.env.example scraper/.env

# Edit scraper/.env with your real credentials
# Use your favorite editor (VSCode, nano, vim, etc.)
code scraper/.env
```

### 2. Install dependencies

```bash
cd scraper
pip install -r requirements.txt
```

### 3. Run the scraper

**On Windows (PowerShell/CMD):**
```bash
.\test-scraper.bat
```

**On Linux/Mac:**
```bash
chmod +x test-scraper.sh
./test-scraper.sh
```

**Or manually:**
```bash
cd scraper
python scraper.py
```

---

## 🧪 Option 2: Using Act (GitHub Actions Locally)

[Act](https://github.com/nektos/act) runs GitHub Actions workflows in Docker containers locally.

### Install Act

**Windows (using winget):**
```bash
winget install nektos.act
```

**Or download from:** https://github.com/nektos/act/releases

**Linux/Mac:**
```bash
# Using Homebrew
brew install act

# Or using curl
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### Create secrets file

Create `.secrets` file in your project root:

```bash
# .secrets file (DO NOT COMMIT THIS!)
DB_HOST=your-database-host.com
DB_HOSTADDR=34.123.45.67
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSLMODE=require
```

### Run with Act

```bash
# List available workflows
act -l

# Run the scraper workflow
act workflow_dispatch -s-file .secrets

# Or run a specific job
act -j scrape --secret-file .secrets

# Run with verbose output
act -j scrape --secret-file .secrets -v
```

### Common Act Issues

1. **Docker required:** Act runs workflows in Docker, so Docker must be installed
2. **Large images:** First run downloads Docker images (~GB size)
3. **Not 100% identical:** Act simulates GitHub Actions but isn't perfect

---

## 🔍 Option 3: Test Individual Components

### Test Database Connection Only

Create `test_db.py` in the `scraper` folder:

```python
import os
from dotenv import load_dotenv
load_dotenv()

# Import the connection function
import sys
sys.path.insert(0, '.')

# Quick connection test
import psycopg2

try:
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        hostaddr=os.getenv("DB_HOSTADDR"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        sslmode=os.getenv("DB_SSLMODE", "require")
    )
    print("✅ Database connection successful!")
    
    # Test a simple query
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print(f"📊 PostgreSQL version: {version[0]}")
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"❌ Connection failed: {e}")
```

Run it:
```bash
cd scraper
python test_db.py
```

### Test Selenium/Chrome Only

Create `test_selenium.py`:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

print("Testing Chrome/Selenium setup...")

options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

try:
    driver = webdriver.Chrome(options=options)
    print("✅ Chrome WebDriver initialized")
    
    driver.get("https://www.google.com")
    print(f"✅ Loaded page: {driver.title}")
    
    driver.quit()
    print("✅ All Selenium tests passed!")
except Exception as e:
    print(f"❌ Selenium test failed: {e}")
    print("\n💡 Make sure Chrome is installed:")
    print("   https://www.google.com/chrome/")
```

Run it:
```bash
cd scraper
python test_selenium.py
```

---

## 🐛 Troubleshooting Local Tests

### "Chrome not found" or "chromedriver" errors

**Fix:** Install Chrome browser
- **Windows/Mac:** https://www.google.com/chrome/
- **Linux:** `sudo apt install chromium-browser chromium-chromedriver`

### "No module named 'dotenv'"

**Fix:** Install dependencies
```bash
cd scraper
pip install -r requirements.txt
```

### Database connection fails locally

**Fix:** Check your `.env` file:
1. Ensure `DB_HOSTADDR` has the IPv4 address (not hostname)
2. Verify database allows connections from your IP
3. Test connection string in a database client first

### Different results locally vs GitHub Actions

This is normal because:
- Different IP addresses (your ISP vs GitHub's servers)
- Different network conditions
- Firewall rules may differ

---

## ✅ Pre-deployment Checklist

Before pushing to GitHub Actions, verify locally:

- [ ] `.env` file created with correct credentials
- [ ] Dependencies install without errors
- [ ] Database connection succeeds
- [ ] Chrome/Selenium works
- [ ] Scraper finds articles from rescue.org
- [ ] Articles insert into database
- [ ] No sensitive data printed to console

---

## 📝 Example Local Test Output

You should see output like this:

```
🚀 Starting Ukraine Articles Scraper
==================================================
✅ All required database credentials present
✅ Resolved db.example.com to IPv4: 34.123.45.67
✅ Using provided DB_HOSTADDR: 34.123.45.67
🔒 Using SSL mode: require
🔧 Forcing IPv4 connection via hostaddr: 34.123.45.67

🔌 Connecting to database...
   Attempt 1/5... ✅ Connected!
✅ Database connection established

🌐 Setting up Chrome WebDriver...
✅ Chrome WebDriver initialized successfully

🔍 Scraping articles from rescue.org...
✅ Page loaded successfully
📰 Found 12 articles:
   1. Ukraine Crisis: How You Can Help...
   2. Supporting Refugees Fleeing War...
   ...

💾 Inserting 12 articles into database...
✅ Table 'war_articles' ready
✅ Inserted 12 new articles

🧹 Cleaning up...
==================================================
✅ Scraper completed successfully!
📊 Summary: 12 new, 0 duplicates, 12 total found
```

---

## 🎯 Next Steps

Once local testing succeeds:

1. **Add secrets to GitHub**: Settings → Secrets and variables → Actions
2. **Push your changes**: `git push`
3. **Test in GitHub Actions**: Actions tab → Run workflow manually
4. **Monitor the first run**: Check logs for any differences from local
