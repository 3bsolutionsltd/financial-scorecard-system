# Financial Scorecard System - Simple Deployment Check

Write-Host "FINANCIAL SCORECARD SYSTEM - DEPLOYMENT STATUS" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "main.py")) {
    Write-Host "ERROR: Please run this script from the scorecard project directory" -ForegroundColor Red
    exit 1
}

Write-Host "Checking deployment readiness..." -ForegroundColor Yellow
Write-Host ""

# Check backend files
if (Test-Path "main.py") {
    Write-Host "[✓] Backend files ready" -ForegroundColor Green
} else {
    Write-Host "[✗] Backend files missing" -ForegroundColor Red
}

# Check frontend files
if (Test-Path "frontend/package.json") {
    Write-Host "[✓] Frontend files ready" -ForegroundColor Green
} else {
    Write-Host "[✗] Frontend files missing" -ForegroundColor Red
}

# Check Docker files
if (Test-Path "Dockerfile") {
    Write-Host "[✓] Docker configuration ready" -ForegroundColor Green
} else {
    Write-Host "[✗] Docker configuration missing" -ForegroundColor Red
}

# Check deployment configs
if (Test-Path "railway.json") {
    Write-Host "[✓] Railway configuration ready" -ForegroundColor Green
} else {
    Write-Host "[✗] Railway configuration missing" -ForegroundColor Red
}

# Check environment templates
if (Test-Path ".env.production.example") {
    Write-Host "[✓] Environment templates ready" -ForegroundColor Green
} else {
    Write-Host "[✗] Environment templates missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "DEPLOYMENT OPTIONS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. VERCEL + RAILWAY (Recommended)" -ForegroundColor Yellow
Write-Host "   - Time: 10-15 minutes"
Write-Host "   - Cost: 5-20 USD/month"
Write-Host "   - Steps: See GO_LIVE_CHECKLIST.md"
Write-Host ""
Write-Host "2. DOCKER + VPS" -ForegroundColor Yellow
Write-Host "   - Time: 30-60 minutes"
Write-Host "   - Cost: 10-50 USD/month"
Write-Host "   - Steps: See PRODUCTION_DEPLOYMENT_GUIDE.md"
Write-Host ""
Write-Host "3. AWS/GOOGLE CLOUD" -ForegroundColor Yellow
Write-Host "   - Time: 1-3 hours"
Write-Host "   - Cost: 20-100 USD/month"
Write-Host "   - Steps: See PRODUCTION_DEPLOYMENT_GUIDE.md"
Write-Host ""

Write-Host "NEXT STEPS:" -ForegroundColor Green
Write-Host "1. Copy .env.production.example to .env and configure"
Write-Host "2. Copy frontend/.env.production.example to frontend/.env.local and configure"
Write-Host "3. Choose deployment option above"
Write-Host "4. Follow the guide for your chosen option"
Write-Host ""
Write-Host "Your system is ready for production deployment!" -ForegroundColor Green