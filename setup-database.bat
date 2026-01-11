@echo off
echo 🏡 RoomNook AI - Complete Setup Script
echo =====================================
echo.

REM Check if MySQL is running
echo 🔍 Checking MySQL connection...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL is not installed or not in PATH
    echo Please install MySQL and add it to your PATH
    pause
    exit /b 1
)

echo ✅ MySQL is available
echo.

REM Create database and run schema
echo 🗄️ Setting up database...
echo Creating database: roomnook_ai
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS roomnook_ai;" 2>nul
if %errorlevel% neq 0 (
    echo ❌ Failed to create database. Please check your MySQL credentials.
    echo Make sure MySQL is running and the password is 'root'
    pause
    exit /b 1
)

echo ✅ Database created successfully
echo.

echo 📊 Running database schema...
mysql -u root -proot roomnook_ai < database\schema.sql
if %errorlevel% neq 0 (
    echo ❌ Failed to run schema.sql
    pause
    exit /b 1
)

echo ✅ Schema loaded successfully
echo.

echo 📊 Running database views...
mysql -u root -proot roomnook_ai < database\views.sql
if %errorlevel% neq 0 (
    echo ❌ Failed to run views.sql
    pause
    exit /b 1
)

echo ✅ Views created successfully
echo.

echo 📊 Loading sample data...
mysql -u root -proot roomnook_ai < database\seed.sql
if %errorlevel% neq 0 (
    echo ❌ Failed to load sample data
    pause
    exit /b 1
)

echo ✅ Sample data loaded successfully
echo.

echo 🎉 Database setup complete!
echo.
echo 📋 Test Credentials:
echo ===================
echo Student: rohan@email.com / password123
echo Owner: rajesh@email.com / password123
echo Admin: admin@roomnook.com / password123
echo.

echo 🚀 To start the application:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.

echo 🎯 Features Available:
echo - Student registration and login
echo - PG Owner registration and login
echo - Admin login
echo - AI Assistant with Perfect Match Score™
echo - Modern responsive UI
echo - Real-time chat interface
echo - Bookmark system
echo - Review system
echo.

pause
