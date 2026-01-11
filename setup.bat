@echo off
echo 🏡 RoomNook AI Setup Script
echo ==========================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Setup Backend
echo 📦 Setting up backend...
cd backend

REM Install dependencies
echo Installing backend dependencies...
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy env.example .env
    echo ⚠️  Please update .env file with your database credentials
)

echo ✅ Backend setup complete

REM Setup Frontend
echo 📦 Setting up frontend...
cd ..\frontend

REM Install dependencies
echo Installing frontend dependencies...
npm install

echo ✅ Frontend setup complete

REM Database setup instructions
echo.
echo 🗄️  Database Setup Required:
echo 1. Create MySQL database: CREATE DATABASE roomnook_ai;
echo 2. Run schema: mysql -u root -p roomnook_ai ^< ..\database\schema.sql
echo 3. Run views: mysql -u root -p roomnook_ai ^< ..\database\views.sql
echo 4. Run seed data: mysql -u root -p roomnook_ai ^< ..\database\seed.sql
echo.

REM Start instructions
echo 🚀 To start the application:
echo 1. Start backend: cd backend ^&^& npm run dev
echo 2. Start frontend: cd frontend ^&^& npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.

echo 🎉 Setup complete! Happy coding!
pause
