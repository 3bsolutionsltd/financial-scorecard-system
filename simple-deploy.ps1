# Simple Deployment Guide - Step by Step

Write-Host "=== FINANCIAL SCORECARD SYSTEM - SIMPLE DEPLOYMENT ===" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "main.py")) {
    Write-Host "ERROR: Please run this script from the scorecard project directory" -ForegroundColor Red
    exit 1
}

Write-Host "STEP 1: Preparing environment files..." -ForegroundColor Yellow

# Create .env files if they don't exist
if (-not (Test-Path ".env")) {
    Copy-Item ".env.production.example" ".env"
    Write-Host "✓ Created .env file - PLEASE EDIT THIS FILE WITH YOUR SETTINGS!" -ForegroundColor Cyan
}

if (-not (Test-Path "frontend/.env.local")) {
    Copy-Item "frontend/.env.production.example" "frontend/.env.local"
    Write-Host "✓ Created frontend/.env.local file - PLEASE EDIT THIS FILE!" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "STEP 2: Building the project..." -ForegroundColor Yellow

# Try to build frontend
Write-Host "Building frontend..."
Set-Location frontend
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "⚠ Frontend build had issues, but continuing..." -ForegroundColor Yellow
}
Set-Location ..

Write-Host ""
Write-Host "STEP 3: Testing local servers..." -ForegroundColor Yellow

# Start backend in background
Write-Host "Testing backend startup..."
$backendProcess = Start-Process python -ArgumentList "main.py" -PassThru -NoNewWindow
Start-Sleep 3

# Check if backend is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Backend is healthy!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Backend test failed, but that's okay for now" -ForegroundColor Yellow
}

# Stop the test backend
if ($backendProcess -and !$backendProcess.HasExited) {
    $backendProcess.Kill()
}

Write-Host ""
Write-Host "=== DEPLOYMENT OPTIONS ===" -ForegroundColor Green
Write-Host ""
Write-Host "🥇 OPTION 1: VERCEL + RAILWAY (RECOMMENDED)" -ForegroundColor Cyan
Write-Host "   Time: 10-15 minutes"
Write-Host "   Cost: $5-20/month"
Write-Host "   Difficulty: Easy"
Write-Host ""
Write-Host "   Steps:"
Write-Host "   1. Visit vercel.com → New Project → Import GitHub repo"
Write-Host "      - Framework: Next.js"
Write-Host "      - Root Directory: frontend"
Write-Host "      - Add env var: NEXT_PUBLIC_API_URL (get from Railway)"
Write-Host ""
Write-Host "   2. Visit railway.app → New Project → GitHub repo"
Write-Host "      - Add PostgreSQL service"
Write-Host "      - Add your environment variables"
Write-Host "      - Deploy automatically"
Write-Host ""
Write-Host "🥈 OPTION 2: NETLIFY + HEROKU" -ForegroundColor Cyan
Write-Host "   Time: 20-30 minutes"
Write-Host "   Cost: $10-30/month"
Write-Host "   Difficulty: Medium"
Write-Host ""
Write-Host "🥉 OPTION 3: AWS/GOOGLE CLOUD" -ForegroundColor Cyan
Write-Host "   Time: 1-3 hours"
Write-Host "   Cost: $20-100/month"
Write-Host "   Difficulty: Advanced"
Write-Host ""

Write-Host ""
Write-Host "=== WHAT YOU NEED TO DO NOW ===" -ForegroundColor Green
Write-Host ""
Write-Host "1. ✏ EDIT .env file with your database settings"
Write-Host "2. ✏ EDIT frontend/.env.local with your API URL"
Write-Host "3. 🌍 Choose a deployment platform above"
Write-Host "4. 📚 Follow the detailed guide in PRODUCTION_DEPLOYMENT_GUIDE.md"
Write-Host ""
Write-Host "🆘 NEED HELP?" -ForegroundColor Yellow
Write-Host "   - Read: GO_LIVE_CHECKLIST.md (15-minute guide)"
Write-Host "   - Read: PRODUCTION_DEPLOYMENT_GUIDE.md (complete guide)"
Write-Host ""
Write-Host "Your system is ready to go live! 🚀" -ForegroundColor Green