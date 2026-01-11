#!/bin/bash

# RoomNook AI Setup Script
echo "🏡 RoomNook AI Setup Script"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp env.example .env
    echo "⚠️  Please update .env file with your database credentials"
fi

echo "✅ Backend setup complete"

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete"

# Database setup instructions
echo ""
echo "🗄️  Database Setup Required:"
echo "1. Create MySQL database: CREATE DATABASE roomnook_ai;"
echo "2. Run schema: mysql -u root -p roomnook_ai < ../database/schema.sql"
echo "3. Run views: mysql -u root -p roomnook_ai < ../database/views.sql"
echo "4. Run seed data: mysql -u root -p roomnook_ai < ../database/seed.sql"
echo ""

# Start instructions
echo "🚀 To start the application:"
echo "1. Start backend: cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""

echo "🎉 Setup complete! Happy coding!"
