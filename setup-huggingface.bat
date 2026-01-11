@echo off
echo 🤗 RoomNook AI - Hugging Face Setup
echo ====================================
echo.
echo Setting up Hugging Face API integration for AI chatbot...
echo.

cd backend
node setup-hf-token.js

echo.
echo Setup complete! You can now start the backend server.
echo.
pause
