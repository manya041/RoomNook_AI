@echo off
echo 🔍 Testing MySQL Connection...
echo.

REM Test different password configurations
echo Testing no password...
mysql -u root -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL connection successful with no password
    echo Updating .env file...
    cd backend
    echo DB_HOST=localhost > .env
    echo DB_USER=root >> .env
    echo DB_PASS= >> .env
    echo DB_NAME=roomnook_ai >> .env
    echo DB_PORT=3306 >> .env
    echo. >> .env
    echo JWT_SECRET=supersecretkey123456789 >> .env
    echo JWT_EXPIRE=7d >> .env
    echo. >> .env
    echo PORT=5000 >> .env
    echo NODE_ENV=development >> .env
    echo. >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo.
    echo ✅ .env file updated with no password configuration
    goto :end
)

echo Testing password 'root'...
mysql -u root -proot -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL connection successful with password 'root'
    echo Updating .env file...
    cd backend
    echo DB_HOST=localhost > .env
    echo DB_USER=root >> .env
    echo DB_PASS=root >> .env
    echo DB_NAME=roomnook_ai >> .env
    echo DB_PORT=3306 >> .env
    echo. >> .env
    echo JWT_SECRET=supersecretkey123456789 >> .env
    echo JWT_EXPIRE=7d >> .env
    echo. >> .env
    echo PORT=5000 >> .env
    echo NODE_ENV=development >> .env
    echo. >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo.
    echo ✅ .env file updated with password 'root'
    goto :end
)

echo Testing password 'password'...
mysql -u root -ppassword -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL connection successful with password 'password'
    echo Updating .env file...
    cd backend
    echo DB_HOST=localhost > .env
    echo DB_USER=root >> .env
    echo DB_PASS=password >> .env
    echo DB_NAME=roomnook_ai >> .env
    echo DB_PORT=3306 >> .env
    echo. >> .env
    echo JWT_SECRET=supersecretkey123456789 >> .env
    echo JWT_EXPIRE=7d >> .env
    echo. >> .env
    echo PORT=5000 >> .env
    echo NODE_ENV=development >> .env
    echo. >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo.
    echo ✅ .env file updated with password 'password'
    goto :end
)

echo ❌ Could not connect to MySQL with any configuration
echo.
echo Please check:
echo 1. MySQL is installed and running
echo 2. MySQL is in your system PATH
echo 3. Try connecting manually: mysql -u root -p
echo 4. Make sure MySQL service is running
echo.
echo You can also try:
echo - XAMPP Control Panel (if using XAMPP)
echo - MySQL Workbench
echo - Command: net start mysql (as administrator)
echo.

:end
pause
