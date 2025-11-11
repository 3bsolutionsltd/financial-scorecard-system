# 🚨 Railway Deployment Troubleshooting Guide

## ❌ **Health Check Failed - Service Unavailable**

If you're seeing "Attempt #X failed with service unavailable" errors, follow these steps:

### **🔧 Immediate Fix Steps**

#### **Step 1: Check Railway Environment Variables**
**In Railway Dashboard → Your Service → Variables, ensure you have:**
```env
SECRET_KEY=your-generated-secret-key
ENVIRONMENT=production
```

**⚠️ DO NOT set DATABASE_URL manually - Railway sets this automatically when you add PostgreSQL service**

#### **Step 2: Verify PostgreSQL Service**
1. **In Railway Dashboard:**
   - Ensure PostgreSQL service is running (green status)
   - Check that it's in the same project
   - Look for DATABASE_URL in your backend service variables

#### **Step 3: Simplify Health Check (Temporary)**
**The health endpoint might be failing due to database connection issues during startup.**

**Quick Fix Applied:** The health endpoint has been simplified to not check database during initial startup.

#### **Step 4: Check Application Startup**
**In Railway Dashboard → Your Service → Logs, look for:**
```bash
✅ Good: "INFO:     Uvicorn running on http://0.0.0.0:8000"
❌ Bad: Any database connection errors
❌ Bad: Import errors or missing dependencies
❌ Bad: Port binding errors
```

#### **Step 5: Manual Database Setup (If Needed)**
**If database connection is still failing:**

1. **Create Database Tables Manually:**
   ```bash
   # In Railway Dashboard → PostgreSQL → Connect → psql
   # Run these commands to create basic tables
   ```

2. **Or Use Railway's Database Browser:**
   - Go to PostgreSQL service → Data tab
   - Create tables manually if needed

### **🔄 Re-deployment Steps**

#### **Option A: Trigger Redeploy**
1. **In Railway Dashboard:**
   - Go to your backend service
   - Click "**Redeploy**" button
   - Monitor logs for successful startup

#### **Option B: Environment Variable Reset**
1. **Remove problematic variables**
2. **Add them back one by one**
3. **Redeploy after each change**

#### **Option C: Fresh Service**
1. **Delete current service**
2. **Add new service from GitHub**
3. **Configure variables from scratch**

### **🐛 Common Issues & Solutions**

#### **Issue: "ModuleNotFoundError"**
```bash
# Solution: Update requirements.txt
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Update requirements"
git push
```

#### **Issue: "Database does not exist"**
```bash
# Solution: Ensure PostgreSQL service is connected
# Check Railway dashboard for DATABASE_URL
# Verify it starts with postgresql://
```

#### **Issue: "Port already in use"**
```bash
# Solution: Railway automatically sets $PORT
# Ensure your app uses: uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### **Issue: "CORS errors after deployment"**
```bash
# Solution: Update CORS_ORIGINS environment variable
CORS_ORIGINS=https://your-actual-frontend-domain.vercel.app
```

### **🔍 Debug Information to Check**

#### **In Railway Logs, Look For:**
```bash
# Successful startup indicators:
✅ "INFO:     Started server process"
✅ "INFO:     Waiting for application startup"
✅ "INFO:     Application startup complete"
✅ "INFO:     Uvicorn running on http://0.0.0.0:XXXX"

# Error indicators:
❌ "ModuleNotFoundError"
❌ "Connection to database failed"
❌ "Port XXXX is already in use"
❌ "ImportError"
```

#### **Test Endpoints After Deployment:**
```bash
# Basic health check (should work immediately)
curl https://your-app.railway.app/health

# Full health check (tests database)
curl https://your-app.railway.app/health/full

# API root
curl https://your-app.railway.app/

# API endpoints
curl https://your-app.railway.app/api/v1/borrowers/
```

### **⚡ Quick Recovery Plan**

If deployment keeps failing:

#### **Plan A: Minimal Deployment**
1. **Temporarily disable database checks**
2. **Deploy with basic health endpoint only**
3. **Add database functionality after successful deployment**

#### **Plan B: Local-First Approach**
1. **Test locally first:** `python main.py`
2. **Ensure all endpoints work locally**
3. **Check local health endpoint:** `http://localhost:8000/health`
4. **Then deploy to Railway**

#### **Plan C: Alternative Deployment**
1. **Try Render or Heroku** as backup platforms
2. **Use Docker locally** to test containerization
3. **Deploy to Vercel** for frontend, separate backend platform

### **📞 Getting Help**

#### **Railway Support:**
- **Discord:** Railway community Discord
- **Docs:** [docs.railway.app](https://docs.railway.app)
- **GitHub:** Railway GitHub issues

#### **Project Support:**
- **Repository:** https://github.com/3bsolutionsltd/financial-scorecard-system
- **Issues:** Create GitHub issue with Railway logs

### **✅ Success Indicators**

You'll know deployment worked when:
- ✅ Health check endpoint returns 200 OK
- ✅ Railway dashboard shows "Active" status
- ✅ No error logs in Railway console
- ✅ Public URL accessible: `https://your-app.railway.app/health`

---

**🎯 Most Common Fix: Ensure PostgreSQL service is running and DATABASE_URL is automatically set by Railway!**