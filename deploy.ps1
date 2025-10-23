# Financial Scorecard System - PowerShell Deployment Script
# This script helps deploy your system to various platforms

Write-Host "Financial Scorecard System - Deployment Helper" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to deploy to Vercel + Railway
function Deploy-VercelRailway {
    Write-Host "Deploying to Vercel + Railway..." -ForegroundColor Yellow
    
    # Check prerequisites
    if (-not (Test-Command "vercel")) {
        Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Red
        npm install -g vercel
    }
    
    # Deploy frontend to Vercel
    Write-Host "Deploying frontend to Vercel..." -ForegroundColor Blue
    Set-Location frontend
    vercel --prod
    Set-Location ..
    
    Write-Host "Frontend deployed to Vercel!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Visit railway.app and connect your GitHub repository"
    Write-Host "   2. Add PostgreSQL service in Railway dashboard"
    Write-Host "   3. Configure environment variables from .env.production.example"
    Write-Host "   4. Deploy backend automatically via GitHub integration"
    
    Write-Host "Railway configuration already created (railway.json)" -ForegroundColor Blue
}

# Function to build Docker containers
function Build-Docker {
    Write-Host "Building Docker containers..." -ForegroundColor Yellow
    
    # Build backend
    Write-Host "Building backend container..." -ForegroundColor Blue
    docker build -t financial-scorecard-backend .
    
    # Build frontend
    Write-Host "Building frontend container..." -ForegroundColor Blue
    Set-Location frontend
    docker build -t financial-scorecard-frontend .
    Set-Location ..
    
    Write-Host "Docker containers built successfully!" -ForegroundColor Green
    Write-Host "To run locally with Docker:" -ForegroundColor Cyan
    Write-Host "   docker run -p 8000:8000 financial-scorecard-backend"
    Write-Host "   docker run -p 3000:3000 financial-scorecard-frontend"
}

# Function to prepare for production
function Prepare-Production {
    Write-Host "Preparing for production deployment..." -ForegroundColor Yellow
    
    # Copy environment templates
    if (-not (Test-Path .env)) {
        Copy-Item .env.production.example .env
        Write-Host "Created .env file from template - please configure it!" -ForegroundColor Cyan
    }
    
    if (-not (Test-Path frontend/.env.local)) {
        Copy-Item frontend/.env.production.example frontend/.env.local
        Write-Host "Created frontend/.env.local file from template - please configure it!" -ForegroundColor Cyan
    }
    
    # Install all dependencies
    Write-Host "Installing backend dependencies..." -ForegroundColor Blue
    pip install -r requirements.txt
    
    Write-Host "Installing frontend dependencies..." -ForegroundColor Blue
    Set-Location frontend
    npm install
    npm run build
    Set-Location ..
    
    Write-Host "Production preparation complete!" -ForegroundColor Green
}

# Function to run health checks
function Test-Health {
    Write-Host "Running health checks..." -ForegroundColor Yellow
    
    # Check backend health
    Write-Host "Checking backend health..." -ForegroundColor Blue
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "Backend is healthy" -ForegroundColor Green
        } else {
            Write-Host "Backend returned status: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "Backend is not responding" -ForegroundColor Red
    }
    
    # Check frontend
    Write-Host "Checking frontend..." -ForegroundColor Blue
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "Frontend is healthy" -ForegroundColor Green
        } else {
            Write-Host "Frontend returned status: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "Frontend is not responding" -ForegroundColor Red
    }
}

# Main menu
Write-Host ""
Write-Host "Choose deployment option:" -ForegroundColor White
Write-Host "1) Deploy to Vercel + Railway (Recommended)"
Write-Host "2) Build Docker containers"
Write-Host "3) Prepare for production"
Write-Host "4) Run health checks"
Write-Host "5) Show deployment guide"
Write-Host "6) Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-6)"

switch ($choice) {
    "1" {
        Prepare-Production
        Deploy-VercelRailway
    }
    "2" {
        Build-Docker
    }
    "3" {
        Prepare-Production
    }
    "4" {
        Test-Health
    }
    "5" {
        Write-Host "Opening deployment guide..." -ForegroundColor Blue
        if (Test-Path "PRODUCTION_DEPLOYMENT_GUIDE.md") {
            Get-Content "PRODUCTION_DEPLOYMENT_GUIDE.md" | Write-Host
        } else {
            Write-Host "Please read PRODUCTION_DEPLOYMENT_GUIDE.md for detailed instructions"
        }
    }
    "6" {
        Write-Host "Goodbye!" -ForegroundColor Green
        exit 0
    }
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Deployment process completed!" -ForegroundColor Green
Write-Host "For detailed instructions, see: PRODUCTION_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host "Need help? Check the troubleshooting section in the guide" -ForegroundColor Cyan