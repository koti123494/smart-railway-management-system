@echo off
title RailTrack India - Launcher
color 0B

echo ========================================================
echo        RailTrack India - Starting Local Servers
echo ========================================================
echo.

:: Ensure Node is in PATH
set "PATH=C:\Program Files\nodejs;%PATH%"

:: Check if Node is available
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not recognized in PATH.
    echo Please make sure Node.js is installed from https://nodejs.org
    pause
    exit /b 1
)

echo [1/4] Checking Backend dependencies...
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
) else (
    echo Backend dependencies already installed.
)

echo.
echo [2/4] Checking Frontend dependencies...
if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend dependencies already installed.
)

echo.
echo [3/4] Starting Backend API Server (Port 5000)...
start "RailTrack - Backend Server (Port 5000)" cmd /k "cd /d \"%~dp0backend\" && npm run dev"

echo.
echo [4/4] Starting Frontend Vite Server (Port 5173)...
start "RailTrack - Frontend Website (Port 5173)" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"

echo.
echo ========================================================
echo  All services are starting up!
echo.
echo  Website URL : http://localhost:5173
echo  Backend API : http://localhost:5000
echo ========================================================
echo.
echo Opening browser to http://localhost:5173 in 5 seconds...
timeout /t 5 >nul
start http://localhost:5173

echo Press any key to close this launcher window.
pause >nul
