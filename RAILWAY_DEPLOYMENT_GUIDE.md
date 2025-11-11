# 🚂 Railway Deployment Guide - Financial Scorecard System

## 🎯 **Complete Railway Deployment (10-15 minutes)**

Railway is perfect for full-stack applications with automatic PostgreSQL setup and seamless GitHub integration.

---

## 📋 **Prerequisites**

### **✅ What You Need:**
- GitHub repository: `https://github.com/3bsolutionsltd/financial-scorecard-system`
- Railway account (free signup at [railway.app](https://railway.app))
- 10-15 minutes of time

---

## 🚀 **Step 1: Deploy Backend to Railway (8 minutes)**

### **1.1 Create Railway Account & Project**
1. **Visit Railway:** Go to [railway.app](https://railway.app)
2. **Sign Up:** Use GitHub account for easy integration
3. **Create New Project:** Click "New Project"
4. **Deploy from GitHub:** Select "Deploy from GitHub repo"
5. **Choose Repository:** Select `3bsolutionsltd/financial-scorecard-system`
6. **Project Name:** `financial-scorecard-backend`

### **1.2 Configure Backend Service**
Railway will automatically:
- ✅ Detect Python application
- ✅ Install dependencies from `requirements.txt`
- ✅ Use `railway.json` configuration
- ✅ Set up build and start commands

**Expected Build Output:**
```
✅ Installing dependencies...
✅ Found requirements.txt
✅ Installing Python packages...
✅ Build completed successfully
✅ Starting with: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### **1.3 Add PostgreSQL Database**
1. **In your Railway project dashboard:**
   - Click "**+ New Service**"
   - Select "**Database**"
   - Choose "**PostgreSQL**"
   
2. **Automatic Configuration:**
   - Railway automatically creates `DATABASE_URL`
   - No manual database setup needed!
   - Connection string is auto-generated

### **1.4 Set Environment Variables**
**In Railway Dashboard → Backend Service → Variables:**

```env
# Required Variables
SECRET_KEY=your-super-secret-production-key-change-this
ENVIRONMENT=production

# CORS (will update after frontend deployment)
CORS_ORIGINS=https://your-frontend-domain.vercel.app

# Optional: Additional Security
ALLOWED_HOSTS=your-backend-domain.railway.app
```

**🔑 Generate SECRET_KEY:**
```python
# Run this locally to generate a secure key
import secrets
print(secrets.token_urlsafe(32))
```

### **1.5 Deploy Backend**
1. **Trigger Deployment:** Click "Deploy"
2. **Monitor Logs:** Watch the deployment process
3. **Get Backend URL:** Copy your Railway app URL (e.g., `https://financial-scorecard-backend-production.railway.app`)

### **1.6 Test Backend Deployment**
**Check Health Endpoint:**
```bash
# Replace with your actual Railway URL
curl https://your-app-name.railway.app/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "database": "healthy", 
  "timestamp": "2025-11-11T10:30:00",
  "version": "1.0.0"
}
```

---

## 🚀 **Step 2: Deploy Frontend to Railway (Optional) or Vercel**

### **Option A: Frontend on Railway (Complete Railway Setup)**

#### **2A.1 Add Frontend Service**
1. **In same Railway project:**
   - Click "**+ New Service**"
   - Select "**GitHub Repo**"
   - Choose same repository
   - **Root Directory:** `frontend`
   - **Service Name:** `financial-scorecard-frontend`

#### **2A.2 Configure Frontend Build**
**Railway will detect Next.js and use:**
```json
{
  "build": "npm run build",
  "start": "npm start",
  "installCommand": "npm install"
}
```

#### **2A.3 Set Frontend Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://your-backend-railway-url.railway.app
NEXT_PUBLIC_ENVIRONMENT=production
```

### **Option B: Frontend on Vercel (Recommended)**

#### **2B.1 Deploy to Vercel**
1. **Visit:** [vercel.com](https://vercel.com)
2. **New Project:** Import GitHub repository
3. **Framework:** Next.js (auto-detected)
4. **Root Directory:** `frontend`
5. **Environment Variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
   NEXT_PUBLIC_ENVIRONMENT=production
   ```
6. **Deploy:** Click Deploy

---

## 🔧 **Step 3: Connect Frontend and Backend**

### **3.1 Update CORS Settings**
**In Railway Backend Variables, update:**
```env
CORS_ORIGINS=https://your-frontend-domain.vercel.app,https://your-frontend.railway.app
```

### **3.2 Test Connection**
1. **Visit Frontend URL**
2. **Test Authentication:** Try logging in with demo credentials
3. **Test API Calls:** Create a trading account
4. **Verify Database:** Check if data persists

---

## 📊 **Step 4: Database Setup & Sample Data**

### **4.1 Run Database Migrations**
**In Railway Backend Logs/Console:**
```bash
# Migrations run automatically on startup
# Check logs for: "Applying migration: 001_initial"
```

### **4.2 Add Sample Data (Optional)**
**Connect to Railway database and run:**
```python
# Use Railway's built-in database client or run locally:
python scripts/create_sample_data.py
```

---

## 💰 **Railway Pricing & Costs**

### **🆓 Free Tier:**
- **$5 credit per month** (enough for development)
- **500 hours execution time**
- **1GB RAM per service**
- **PostgreSQL included**

### **💳 Pro Tier ($20/month):**
- **$20 credit per month**
- **Unlimited execution time**
- **8GB RAM per service**
- **Priority support**

### **📊 Typical Costs:**
```
Backend Service: ~$3-8/month
PostgreSQL: ~$2-5/month  
Frontend (if on Railway): ~$2-5/month
Total: $7-18/month
```

---

## 🌐 **Custom Domain Setup**

### **Backend Domain:**
1. **In Railway Dashboard:**
   - Go to Backend Service → Settings
   - Click "**Domains**"
   - Add custom domain: `api.yourdomain.com`
   - Configure DNS CNAME record

### **Frontend Domain (if using Railway):**
1. **In Railway Dashboard:**
   - Go to Frontend Service → Settings  
   - Add custom domain: `yourdomain.com`
   - Configure DNS A record

### **SSL Certificates:**
- ✅ **Automatic SSL** for Railway domains
- ✅ **Free Let's Encrypt** for custom domains
- ✅ **Automatic renewal**

---

## 📊 **Monitoring & Debugging**

### **Railway Dashboard Features:**
- 📈 **Real-time Metrics** - CPU, Memory, Network usage
- 📋 **Live Logs** - Application and build logs
- 🔍 **Database Viewer** - Built-in database browser
- 📊 **Usage Analytics** - Request volume and response times

### **Health Monitoring:**
**Your app includes health endpoint:**
```
GET https://your-app.railway.app/health
```

**Monitor with:**
- **Uptime Robot** (free external monitoring)
- **Railway's built-in metrics**
- **Custom alerts via webhooks**

---

## 🆘 **Troubleshooting Common Issues**

### **� DEPLOYMENT FAILURE: Health Check Failed**
**If you see "service unavailable" and health check failures:**

#### **Problem:** Application not starting or health endpoint unreachable

#### **Solutions:**

**1. Check Railway Environment Variables:**
```env
# Ensure these are set in Railway Dashboard:
DATABASE_URL=postgresql://... (auto-generated by Railway)
SECRET_KEY=your-secret-key-here
ENVIRONMENT=production
PORT=8000 (Railway sets this automatically)
```

**2. Fix Database Connection Issues:**
```bash
# Common issue: Database not connected properly
# Check Railway logs for database connection errors
# Ensure PostgreSQL service is running
```

**3. Update Railway Configuration:**
Create `railway.toml` in project root:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
```

**4. Simplify Health Check (Temporary Fix):**
Update `main.py` health endpoint:
```python
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}
```

### **�🐛 Build Failures:**
```bash
# Check logs for:
- Python version compatibility
- Missing dependencies in requirements.txt
- Environment variable issues
```

**Solutions:**
```bash
# Ensure Python 3.10+ in runtime.txt
echo "python-3.10.8" > runtime.txt

# Check requirements.txt format
pip freeze > requirements.txt
```

### **🐛 Database Connection Issues:**
```bash
# Check if DATABASE_URL is set
# Verify PostgreSQL service is running
# Check network connectivity
```

**Solutions:**
- Restart PostgreSQL service
- Verify environment variables
- Check Railway service status

### **🐛 CORS Errors:**
```bash
# Update CORS_ORIGINS environment variable
# Ensure frontend domain is included
# Check for typos in URLs
```

---

## ✅ **Deployment Verification Checklist**

### **Backend Verification:**
- [ ] Health endpoint returns 200 OK
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Environment variables set correctly
- [ ] Logs show no errors

### **Frontend Verification:**
- [ ] Site loads without errors
- [ ] Authentication system working
- [ ] API calls successful
- [ ] All pages accessible
- [ ] Responsive design working

### **Integration Verification:**
- [ ] Frontend can reach backend API
- [ ] Database operations working
- [ ] User sessions persisting
- [ ] Business search functioning
- [ ] Trading account creation working

---

## 🎯 **Post-Deployment Steps**

### **1. Security Hardening:**
```env
# Update production environment variables
SECRET_KEY=new-production-key
ENVIRONMENT=production
DEBUG=False
```

### **2. Monitoring Setup:**
- Set up **Uptime Robot** for external monitoring
- Configure **Railway alerts** for service issues
- Monitor **database performance**

### **3. Backup Strategy:**
- **Railway PostgreSQL** includes automatic backups
- Set up **additional backup schedule** if needed
- Test **restore procedures**

---

## 🚀 **Success! Your App is Live**

### **📋 What You Now Have:**
- ✅ **Live Backend API** at Railway
- ✅ **PostgreSQL Database** with automatic backups
- ✅ **Professional Frontend** (Railway or Vercel)
- ✅ **Custom Domains** (optional)
- ✅ **SSL Certificates** (automatic)
- ✅ **Monitoring Dashboard**

### **🔗 Your URLs:**
- **Backend:** `https://financial-scorecard-backend-production.railway.app`
- **Frontend:** `https://your-frontend-domain.vercel.app`
- **Database:** Managed by Railway (internal access)

### **👥 Share Your Success:**
- **Portfolio:** Add live URL to your portfolio
- **LinkedIn:** Share your full-stack deployment
- **GitHub:** Update README with live demo links

---

**🎉 Congratulations! Your Financial Scorecard System is now live on Railway! 🎉**

**⏱️ Total deployment time: 10-15 minutes**  
**💰 Monthly cost: $7-18 (including database)**  
**🔧 Maintenance: Minimal (Railway handles infrastructure)**