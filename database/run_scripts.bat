@echo off
echo Recreating RoomNook AI Database...

REM Try to find MySQL executable
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
if not exist %MYSQL_PATH% (
    set MYSQL_PATH="C:\xampp\mysql\bin\mysql.exe"
)
if not exist %MYSQL_PATH% (
    set MYSQL_PATH="mysql"
)

echo Using MySQL at: %MYSQL_PATH%

REM Run the recreate database script
echo Dropping and recreating database...
%MYSQL_PATH% -u root -proot < recreate_database.sql

REM Run the dummy data script
echo Inserting dummy data...
%MYSQL_PATH% -u root -proot < insert_dummy_data.sql

echo Database setup complete!
pause
