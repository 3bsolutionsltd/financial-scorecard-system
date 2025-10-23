# Financial Scorecard System - Production Deployment Guide

## 🚀 **Going Live: Complete Deployment Strategy**

### **Current System Architecture:**
- **Backend:** FastAPI + PostgreSQL (Python)
- **Frontend:** Next.js + React (TypeScript)
- **Authentication:** JWT-like sessions with role-based access
- **Database:** PostgreSQL with SQLAlchemy ORM

---

## 🏗️ **Deployment Options (Ranked by Simplicity)**

### **1. 🥇 RECOMMENDED: Vercel + Railway (Easiest)**

#### **Why This Setup:**
- ✅ **Fastest deployment** (minutes, not hours)
- ✅ **Auto-scaling** built-in
- ✅ **Free tiers available**
- ✅ **Automatic HTTPS**
- ✅ **Git-based deployments**

#### **Frontend on Vercel:**
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. In your frontend directory
cd frontend
vercel

# 3. Follow prompts:
# - Connect to GitHub (recommended)
# - Project name: financial-scorecard-frontend
# - Framework preset: Next.js
# - Root directory: ./
```

#### **Backend on Railway:**
```bash
# 1. Create railway.json in project root:
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health"
  }
}

# 2. Create Procfile:
web: uvicorn main:app --host 0.0.0.0 --port $PORT

# 3. Deploy to Railway:
# - Visit railway.app
# - Connect GitHub repo
# - Deploy automatically
```

#### **Database on Railway:**
- Add PostgreSQL service in Railway dashboard
- Environment variables auto-configured
- Automatic backups included

**✅ Total Setup Time: 15-30 minutes**
**💰 Cost: $0-20/month (depending on usage)**

---

### **2. 🥈 AWS Setup (Professional Grade)**

#### **Frontend: AWS Amplify**
```bash
# 1. Install AWS CLI
npm install -g @aws-amplify/cli

# 2. Initialize Amplify
amplify init
amplify add hosting
amplify publish
```

#### **Backend: AWS App Runner**
```dockerfile
# Create Dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### **Database: AWS RDS PostgreSQL**
- Managed PostgreSQL instance
- Automatic backups and scaling
- High availability options

**✅ Total Setup Time: 2-4 hours**
**💰 Cost: $50-200/month**

---

### **3. 🥉 Docker + VPS (Full Control)**

#### **Complete Docker Setup:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: scorecard
      POSTGRES_USER: scorecarduser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: 
      context: .
      dockerfile: Dockerfile.backend
    environment:
      DATABASE_URL: postgresql://scorecarduser:${DB_PASSWORD}@postgres:5432/scorecard
    ports:
      - "8000:8000"
    depends_on:
      - postgres

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
```

**Dockerfile.backend:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**frontend/Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**VPS Providers:**
- **DigitalOcean Droplets** ($10-40/month)
- **Linode** ($10-50/month)
- **AWS EC2** ($20-100/month)
- **Google Cloud Compute** ($20-80/month)

**✅ Total Setup Time: 4-8 hours**
**💰 Cost: $10-50/month**

---

## 🔧 **Pre-Deployment Checklist**

### **1. Environment Configuration**

**Backend Environment Variables:**
```bash
# Create .env file
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-secret-key-here
ENVIRONMENT=production
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Frontend Environment Variables:**
```bash
# Create .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ENVIRONMENT=production
```

### **2. Security Hardening**

**Update main.py for production:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="Financial Scorecard System",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None
)

# Production CORS settings
if os.getenv("ENVIRONMENT") == "production":
    allowed_origins = os.getenv("CORS_ORIGINS", "").split(",")
else:
    allowed_origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### **3. Database Migration Strategy**

**Create migration script:**
```python
# scripts/migrate.py
from alembic import command
from alembic.config import Config

def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

if __name__ == "__main__":
    run_migrations()
```

### **4. Health Checks & Monitoring**

**Add health endpoint:**
```python
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }
```

---

## 🌍 **Domain & SSL Setup**

### **1. Domain Configuration**
- Purchase domain from **Namecheap**, **GoDaddy**, or **Google Domains**
- Set DNS records:
  ```
  A Record: @ -> Your server IP
  A Record: www -> Your server IP
  CNAME: api -> Your backend URL
  ```

### **2. SSL Certificate**
- **Let's Encrypt** (Free): Use Certbot
- **Cloudflare** (Free): SSL + CDN
- **AWS Certificate Manager** (Free with AWS)

---

## 📊 **Monitoring & Analytics**

### **Application Monitoring:**
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring

### **Infrastructure Monitoring:**
- **Uptime Robot** - Uptime monitoring
- **Pingdom** - Website monitoring
- **DataDog** - Infrastructure metrics

---

## 💰 **Cost Breakdown by Option**

### **Option 1: Vercel + Railway**
```
Frontend (Vercel Pro): $20/month
Backend (Railway): $5-15/month
Database (Railway): $5-10/month
Domain: $10-15/year
-----------------
Total: $30-45/month
```

### **Option 2: AWS**
```
Amplify (Frontend): $15-30/month
App Runner (Backend): $25-50/month
RDS PostgreSQL: $20-60/month
Domain (Route 53): $12/year
-----------------
Total: $60-140/month
```

### **Option 3: VPS**
```
DigitalOcean Droplet: $20-40/month
Domain: $10-15/year
CDN (optional): $10-20/month
-----------------
Total: $30-60/month
```

---

## 🚀 **Recommended Deployment Steps**

### **For Immediate Launch (Vercel + Railway):**

1. **Prepare Repository:**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy Frontend to Vercel:**
   - Visit vercel.com
   - Import your GitHub repository
   - Configure build settings
   - Deploy automatically

3. **Deploy Backend to Railway:**
   - Visit railway.app
   - Connect GitHub repository
   - Add PostgreSQL service
   - Configure environment variables
   - Deploy

4. **Configure Domain:**
   - Add custom domain in Vercel
   - Update CORS settings in backend
   - Test all functionality

5. **Set Up Monitoring:**
   - Add Sentry for error tracking
   - Configure uptime monitoring
   - Set up backup strategy

**✅ Total Time to Live: 1-2 hours**

---

## 🔒 **Production Security Checklist**

- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Error messages sanitized
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured
- [ ] Security headers added

---

## 📞 **Support & Maintenance**

### **Ongoing Maintenance:**
- Weekly security updates
- Monthly dependency updates
- Quarterly performance reviews
- Database backup verification

### **Support Resources:**
- **Vercel Docs:** vercel.com/docs
- **Railway Docs:** docs.railway.app
- **FastAPI Docs:** fastapi.tiangolo.com
- **Next.js Docs:** nextjs.org/docs

---

**🎯 RECOMMENDATION: Start with Vercel + Railway for fastest time-to-market, then migrate to AWS as you scale!**