# RailTrack India - PowerShell Startup Script
$Host.UI.RawUI.WindowTitle = "RailTrack India - Launcher"
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       RailTrack India - Starting Local Servers         " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# Prepend standard Node.js path
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH

$backendDir = Join-Path $PSScriptRoot "backend"
$frontendDir = Join-Path $PSScriptRoot "frontend"

# 1. Backend Dependencies
Write-Host "`n[1/4] Checking Backend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path (Join-Path $backendDir "node_modules"))) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Gray
    Start-Process -FilePath "npm.cmd" -ArgumentList "install" -WorkingDirectory $backendDir -Wait -NoNewWindow
} else {
    Write-Host "Backend dependencies already installed." -ForegroundColor Green
}

# 2. Frontend Dependencies
Write-Host "`n[2/4] Checking Frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path (Join-Path $frontendDir "node_modules"))) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Gray
    Start-Process -FilePath "npm.cmd" -ArgumentList "install" -WorkingDirectory $frontendDir -Wait -NoNewWindow
} else {
    Write-Host "Frontend dependencies already installed." -ForegroundColor Green
}

# 3. Launch Backend Server in new window
Write-Host "`n[3/4] Starting Backend Server on http://localhost:5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'RailTrack Backend (Port 5000)'; `$env:PATH = 'C:\Program Files\nodejs;' + `$env:PATH; Set-Location '$backendDir'; npm run dev"

# 4. Launch Frontend Vite in new window
Write-Host "`n[4/4] Starting Frontend Server on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'RailTrack Frontend (Port 5173)'; `$env:PATH = 'C:\Program Files\nodejs;' + `$env:PATH; Set-Location '$frontendDir'; npm run dev"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " Services launched successfully!" -ForegroundColor Green
Write-Host " Website URL : http://localhost:5173" -ForegroundColor White
Write-Host " Backend API : http://localhost:5000" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Green

Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"
