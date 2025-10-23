#!/bin/bash

# Financial Scorecard System - Quick Deployment Script
# This script helps deploy your system to various platforms

echo "🚀 Financial Scorecard System - Deployment Helper"
echo "=================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to deploy to Vercel + Railway
deploy_vercel_railway() {
    echo "🎯 Deploying to Vercel + Railway..."
    
    # Check prerequisites
    if ! command_exists vercel; then
        echo "❌ Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Deploy frontend to Vercel
    echo "📦 Deploying frontend to Vercel..."
    cd frontend
    vercel --prod
    cd ..
    
    echo "✅ Frontend deployed to Vercel!"
    echo "📝 Next steps:"
    echo "   1. Visit railway.app and connect your GitHub repository"
    echo "   2. Add PostgreSQL service in Railway dashboard"
    echo "   3. Configure environment variables from .env.production.example"
    echo "   4. Deploy backend automatically via GitHub integration"
    
    # Create Railway deployment file
    echo "📄 Railway configuration already created (railway.json)"
}

# Function to build Docker containers
build_docker() {
    echo "🐳 Building Docker containers..."
    
    # Build backend
    echo "🔨 Building backend container..."
    docker build -t financial-scorecard-backend .
    
    # Build frontend
    echo "🔨 Building frontend container..."
    cd frontend
    docker build -t financial-scorecard-frontend .
    cd ..
    
    echo "✅ Docker containers built successfully!"
    echo "📝 To run locally with Docker:"
    echo "   docker run -p 8000:8000 financial-scorecard-backend"
    echo "   docker run -p 3000:3000 financial-scorecard-frontend"
}

# Function to prepare for production
prepare_production() {
    echo "🔧 Preparing for production deployment..."
    
    # Copy environment templates
    if [ ! -f .env ]; then
        cp .env.production.example .env
        echo "📋 Created .env file from template - please configure it!"
    fi
    
    if [ ! -f frontend/.env.local ]; then
        cp frontend/.env.production.example frontend/.env.local
        echo "📋 Created frontend/.env.local file from template - please configure it!"
    fi
    
    # Install all dependencies
    echo "📦 Installing backend dependencies..."
    pip install -r requirements.txt
    
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    npm run build
    cd ..
    
    echo "✅ Production preparation complete!"
}

# Function to run health checks
health_check() {
    echo "🏥 Running health checks..."
    
    # Check backend health
    echo "🔍 Checking backend health..."
    if command_exists curl; then
        if curl -f http://localhost:8000/health >/dev/null 2>&1; then
            echo "✅ Backend is healthy"
        else
            echo "❌ Backend is not responding"
        fi
    else
        echo "⚠️  curl not found - cannot check backend health"
    fi
    
    # Check frontend
    echo "🔍 Checking frontend..."
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        echo "✅ Frontend is healthy"
    else
        echo "❌ Frontend is not responding"
    fi
}

# Main menu
echo ""
echo "Choose deployment option:"
echo "1) 🥇 Deploy to Vercel + Railway (Recommended)"
echo "2) 🐳 Build Docker containers"
echo "3) 🔧 Prepare for production"
echo "4) 🏥 Run health checks"
echo "5) 📋 Show deployment guide"
echo "6) ❌ Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        prepare_production
        deploy_vercel_railway
        ;;
    2)
        build_docker
        ;;
    3)
        prepare_production
        ;;
    4)
        health_check
        ;;
    5)
        echo "📖 Opening deployment guide..."
        if command_exists cat; then
            cat PRODUCTION_DEPLOYMENT_GUIDE.md
        else
            echo "Please read PRODUCTION_DEPLOYMENT_GUIDE.md for detailed instructions"
        fi
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📚 For detailed instructions, see: PRODUCTION_DEPLOYMENT_GUIDE.md"
echo "🆘 Need help? Check the troubleshooting section in the guide"