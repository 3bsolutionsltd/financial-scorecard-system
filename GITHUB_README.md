# 🏦 Financial Scorecard System

A comprehensive financial risk assessment and business management platform built with FastAPI, Next.js, and PostgreSQL.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black.svg)](https://nextjs.org)

## 🚀 **Live Demo**
*Ready for deployment in 15 minutes!*

## 📋 **Features**

### 🔐 **Authentication & Security**
- Role-based access control (Admin, User, Demo)
- Smart progressive authentication
- Session management with 24-hour expiration
- Protected actions for sensitive operations

### 🏢 **Business Management**  
- Searchable business directory with create-on-fly functionality
- Advanced dropdown with keyboard navigation
- Business profile management
- Borrower relationship tracking

### 📊 **Financial Analysis**
- Trading account management
- Risk factor calculations
- Financial scorecard generation
- Inventory tracking
- Period-based reporting

### 🎨 **Modern Interface**
- Professional landing page
- Responsive dashboard design
- Real-time data synchronization  
- Comprehensive user documentation
- Mobile-friendly design

### 🚀 **Production Ready**
- Docker containerization
- Multiple deployment options
- Environment configuration templates
- Health checks and monitoring
- Database migrations with Alembic

## 🏗️ **Technology Stack**

### **Backend**
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Production database
- **Alembic** - Database migrations
- **Pydantic** - Data validation

### **Frontend**  
- **Next.js 14** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **React Context** - State management

### **DevOps**
- **Docker** - Containerization
- **Railway/Vercel** - Deployment platforms
- **GitHub Actions** - CI/CD ready
- **Health monitoring** - Production monitoring

## ⚡ **Quick Start**

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/yourusername/financial-scorecard-system.git
cd financial-scorecard-system

# Backend setup
pip install -r requirements.txt
python main.py

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### **🌐 Production Deployment (15 minutes)**
1. **Vercel + Railway** (Recommended)
   - Frontend: Deploy to [Vercel](https://vercel.com)
   - Backend: Deploy to [Railway](https://railway.app)
   - Database: Railway PostgreSQL

2. **Docker Deployment**
   ```bash
   docker build -t financial-scorecard .
   docker run -p 8000:8000 financial-scorecard
   ```

3. **See [GO_LIVE_CHECKLIST.md](./GO_LIVE_CHECKLIST.md) for detailed steps**

## 📚 **Documentation**

- 📖 **[Production Deployment Guide](./PRODUCTION_DEPLOYMENT_GUIDE.md)** - Complete deployment strategies
- ✅ **[Go Live Checklist](./GO_LIVE_CHECKLIST.md)** - 15-minute deployment guide  
- 🎨 **[Frontend User Manual](./FRONTEND_USER_MANUAL.md)** - User interface guide
- 🔐 **[Authentication Guide](./AUTHENTICATION_IMPLEMENTATION_SUMMARY.md)** - Security implementation
- 🏢 **[Business Features Guide](./BUSINESS_NAME_FEATURE_GUIDE.md)** - Business management features

## 🗂️ **Project Structure**

```
financial-scorecard-system/
├── 🔧 Backend (FastAPI)
│   ├── api/              # REST API endpoints
│   ├── models/           # Database models
│   ├── services/         # Business logic
│   └── alembic/          # Database migrations
├── 🎨 Frontend (Next.js)
│   ├── src/components/   # React components  
│   ├── src/api/          # API client & types
│   └── src/app/          # Next.js app directory
├── 🐳 Deployment
│   ├── Dockerfile        # Container setup
│   ├── railway.json      # Railway config
│   └── deploy scripts    # Deployment helpers
└── 📚 Documentation      # Comprehensive guides
```

## 🎯 **Key Components**

### **Dashboard Features**
- 📊 **Trading Accounts** - Financial account management
- 🏢 **Business Directory** - Searchable business database  
- ⚖️ **Risk Factors** - Risk assessment calculations
- 📈 **Scorecards** - Financial performance scoring
- 📦 **Inventory** - Asset tracking

### **Authentication System**
- 🔑 **Smart Login** - Progressive authentication flow
- 👤 **User Profiles** - Role-based access levels  
- 🛡️ **Protected Actions** - Secure operation confirmation
- ⏰ **Session Management** - 24-hour automatic expiration

## 🚀 **Deployment Options**

| Platform | Setup Time | Monthly Cost | Best For |
|----------|------------|--------------|----------|
| **Vercel + Railway** | 15 min | $5-35 | Quick deployment |
| **Docker + VPS** | 1-2 hrs | $10-50 | Full control |
| **AWS/GCP** | 2-4 hrs | $50-200 | Enterprise scale |

## 🔧 **Environment Setup**

### **Required Environment Variables**
```env
# Backend
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key
ENVIRONMENT=production

# Frontend  
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## 🧪 **Demo Credentials**
- **Admin**: admin / admin123
- **User**: user / user123  
- **Demo**: demo / demo

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- 📖 **Documentation**: Comprehensive guides included
- 🎯 **Quick Deploy**: 15-minute setup guide
- 🔧 **Troubleshooting**: See deployment guides
- 💬 **Issues**: GitHub Issues for bug reports

## 🌟 **Features Highlights**

✅ **Production Ready** - Complete deployment setup  
✅ **Modern Stack** - FastAPI + Next.js + PostgreSQL  
✅ **Secure** - Role-based authentication system  
✅ **Scalable** - Docker containers + cloud deployment  
✅ **Documented** - Comprehensive user guides  
✅ **Responsive** - Mobile-friendly interface  

---

**🎯 Ready to deploy? See [GO_LIVE_CHECKLIST.md](./GO_LIVE_CHECKLIST.md) for 15-minute deployment!**