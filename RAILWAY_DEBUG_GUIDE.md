# 🚨 Railway Health Check Debug Guide

## ❌ **Still Getting Health Check Failures?**

If you're still seeing "service unavailable" after the fixes, let's debug this systematically:

---

## 🔍 **Step 1: Check Railway Logs**

### **In Railway Dashboard:**
1. Go to your backend service
2. Click **"Logs"** tab
3. Look for these specific messages:

#### **✅ Good Signs:**
```bash
INFO:     Started server process [1]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

#### **❌ Bad Signs (Common Issues):**
```bash
# Database connection errors:
sqlalchemy.exc.OperationalError: could not connect to server

# Import errors:
ModuleNotFoundError: No module named 'xxx'

# Port binding errors:
OSError: [Errno 98] Address already in use

# Environment variable errors:
KeyError: 'DATABASE_URL'
```

---

## 🛠️ **Step 2: Emergency Fixes**

### **Fix A: Disable Database During Startup**
**If you see database errors in logs, temporarily disable database:**

**Update `main.py` to skip database initialization:**
```python
# Comment out this line temporarily:
# from models.database import SessionLocal

# And update health check:
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "API is running (database disabled for testing)",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }
```

### **Fix B: Use Minimal Startup**
**Create a minimal version for testing:**

**Create `minimal_main.py`:**
```python
from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="Financial Scorecard System - Minimal")

@app.get("/")
def root():
    return {"message": "Minimal API is running"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Minimal API health check",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Update `railway.toml`:**
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "uvicorn minimal_main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
```

### **Fix C: Check Environment Variables**
**Ensure these are set in Railway Dashboard → Variables:**

```env
# Minimal required variables:
ENVIRONMENT=production

# Optional (remove if causing issues):
# DATABASE_URL (let Railway auto-generate this)
# SECRET_KEY (add after basic deployment works)
# CORS_ORIGINS (add after basic deployment works)
```

---

## 🔧 **Step 3: Progressive Deployment**

### **Phase 1: Basic API (No Database)**
1. **Deploy minimal version** (no database dependencies)
2. **Verify health check passes**
3. **Test basic endpoints**

### **Phase 2: Add Database**
1. **Add PostgreSQL service to Railway**
2. **Enable database in main.py**
3. **Test database health endpoint**

### **Phase 3: Full Features**
1. **Add all environment variables**
2. **Enable all API endpoints**
3. **Test full functionality**

---

## 🐛 **Step 4: Common Railway Issues**

### **Issue: Application Not Starting**
```bash
# Check these in Railway logs:
- Python version compatibility
- Missing dependencies
- Import errors
- Port binding issues
```

### **Issue: Health Endpoint Not Responding**
```bash
# Possible causes:
- App crashed during startup
- Wrong port binding (should use $PORT)
- Health endpoint path incorrect
- Application startup timeout
```

### **Issue: Database Connection Fails**
```bash
# Solutions:
1. Ensure PostgreSQL service is running in Railway
2. Check DATABASE_URL is auto-generated
3. Verify database migrations don't run during health check
4. Use separate database health endpoint
```

---

## ⚡ **Quick Test Commands**

### **Test Locally First:**
```bash
# Test the exact same setup locally:
cd C:\Users\DELL\scorecard

# Test minimal version:
python -c "
from fastapi import FastAPI
from datetime import datetime
import uvicorn

app = FastAPI()

@app.get('/health')
def health():
    return {'status': 'healthy', 'message': 'Local test'}

uvicorn.run(app, host='0.0.0.0', port=8000)
"

# Test in browser: http://localhost:8000/health
```

### **Test Railway URL:**
```bash
# Once deployed, test these:
curl https://your-app.railway.app/health
curl https://your-app.railway.app/
curl -I https://your-app.railway.app/health  # Check headers only
```

---

## 🚑 **Emergency Alternative: Render Deployment**

### **If Railway keeps failing, try Render.com:**

1. **Visit:** [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment:** Add PostgreSQL database
6. **Deploy:** Usually more reliable than Railway

---

## 📞 **Get Immediate Help**

### **Share These Details:**
1. **Railway logs** (copy the startup logs)
2. **Environment variables** (what's set in Railway)
3. **Local testing results** (does it work locally?)
4. **PostgreSQL service status** (is it running?)

### **Quick Debug Checklist:**
- [ ] Railway PostgreSQL service is running (green status)
- [ ] No environment variables set manually except ENVIRONMENT=production
- [ ] Local testing works: `python main.py` → `http://localhost:8000/health`
- [ ] Railway logs show "Uvicorn running" message
- [ ] Health endpoint returns 200 when tested locally

---

## 🎯 **Most Likely Solutions**

### **Solution 1: Database Issues**
**Remove all database dependencies temporarily:**
```python
# In main.py, comment out:
# - All database imports
# - Database session creation
# - Any database queries in health check
```

### **Solution 2: Environment Issues**
**Clear all environment variables except:**
```env
ENVIRONMENT=production
```

### **Solution 3: Port Issues**
**Ensure using Railway's port:**
```python
# In main.py:
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
```

---

**🚨 Try these fixes in order, testing after each one. The goal is to get a basic "Hello World" working first, then add complexity!**