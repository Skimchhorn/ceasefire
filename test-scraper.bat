@echo off
REM Local test script for the scraper (Windows)
REM This simulates the GitHub Actions environment locally

echo 🧪 Testing Scraper Locally
echo ================================
echo.

REM Check if .env file exists
if not exist "scraper\.env" (
    echo ❌ Error: scraper\.env file not found!
    echo.
    echo 📝 Create it from the example:
    echo    copy scraper\.env.example scraper\.env
    echo    # Then edit scraper\.env with your real credentials
    exit /b 1
)

echo ✅ Found .env file
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    exit /b 1
)

echo 🐍 Python version:
python --version
echo.

REM Check Chrome (optional)
where chrome >nul 2>&1
if not errorlevel 1 (
    echo ✅ Chrome is installed
) else (
    echo ⚠️  Chrome not found - install it for Selenium to work
    echo    Download from: https://www.google.com/chrome/
)
echo.

REM Install dependencies
echo 📦 Installing Python dependencies...
cd scraper
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    cd ..
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Run the scraper
echo 🚀 Running scraper...
echo ================================
python scraper.py
if errorlevel 1 (
    echo.
    echo ❌ Scraper failed
    cd ..
    exit /b 1
)

cd ..
echo.
echo ================================
echo ✅ Test completed successfully!
