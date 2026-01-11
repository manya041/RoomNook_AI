@echo off
echo 🏡 RoomNook AI - Database Setup Script
echo =====================================
echo.

echo 🔍 Attempting to connect to MySQL...
echo.

REM Try different MySQL configurations
echo Attempting connection with no password...
mysql -u root -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connected to MySQL with no password
    goto :setup_database
)

echo Attempting connection with password 'root'...
mysql -u root -proot -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connected to MySQL with password 'root'
    goto :setup_database_root
)

echo Attempting connection with password 'password'...
mysql -u root -ppassword -e "SELECT 1;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connected to MySQL with password 'password'
    goto :setup_database_password
)

echo ❌ Could not connect to MySQL
echo Please check:
echo 1. MySQL is installed and running
echo 2. MySQL is in your system PATH
echo 3. Try connecting manually: mysql -u root -p
echo.
pause
exit /b 1

:setup_database
echo.
echo 🗄️ Setting up database with no password...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS roomnook_ai;"
mysql -u root roomnook_ai < database\schema.sql
mysql -u root roomnook_ai < database\views.sql
mysql -u root roomnook_ai < database\comprehensive_dummy_data.sql
goto :success

:setup_database_root
echo.
echo 🗄️ Setting up database with password 'root'...
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS roomnook_ai;"
mysql -u root -proot roomnook_ai < database\schema.sql
mysql -u root -proot roomnook_ai < database\views.sql
mysql -u root -proot roomnook_ai < database\comprehensive_dummy_data.sql
goto :success

:setup_database_password
echo.
echo 🗄️ Setting up database with password 'password'...
mysql -u root -ppassword -e "CREATE DATABASE IF NOT EXISTS roomnook_ai;"
mysql -u root -ppassword roomnook_ai < database\schema.sql
mysql -u root -ppassword roomnook_ai < database\views.sql
mysql -u root -ppassword roomnook_ai < database\comprehensive_dummy_data.sql
goto :success

:success
echo.
echo 🎉 Database setup complete!
echo.
echo 📊 Dummy Data Loaded:
echo - 10 Students with different preferences
echo - 6 PG Owners with verified accounts
echo - 1 Admin account
echo - 12 PG Listings in different locations
echo - 8 Mess Services with ratings
echo - 10 Roommate Profiles
echo - 20 Reviews (PG and Mess)
echo - 40 Bookmarks
echo - 10 PG Applications
echo.
echo 🧪 Test Credentials:
echo ===================
echo Student: rohan@email.com / password123
echo Owner: rajesh@email.com / password123
echo Admin: admin@roomnook.com / password123
echo.
echo 🚀 Your application is ready to use!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
