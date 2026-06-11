@echo off
echo Resetting MySQL root password to 'root'
echo =======================================

echo Step 1: Stopping MySQL service...
net stop MySQL80
if %errorlevel% neq 0 (
    echo Failed to stop MySQL service. Please run as Administrator.
    pause
    exit /b 1
)

echo Step 2: Starting MySQL in safe mode...
start "" "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --skip-grant-tables --skip-networking

echo Waiting 5 seconds for MySQL to start...
timeout /t 5 /nobreak >nul

echo Step 3: Connecting and resetting password...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -e "FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';"

echo Step 4: Stopping safe mode MySQL...
taskkill /f /im mysqld.exe >nul 2>&1

echo Step 5: Starting MySQL service normally...
net start MySQL80

echo Step 6: Testing connection...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "SELECT 1;"

if %errorlevel% equ 0 (
    echo ✅ Password reset successful!
) else (
    echo ❌ Password reset failed
)

echo.
echo Now you can run the database setup.
pause