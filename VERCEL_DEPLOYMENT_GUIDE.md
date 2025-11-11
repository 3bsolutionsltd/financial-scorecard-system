# Frontend Deployment to Vercel

## 🚀 Quick Vercel Deployment (5 minutes)

### **Step 1: Go to Vercel**
1. Visit: https://vercel.com
2. Click "Continue with GitHub" 
3. Import your repository: `3bsolutionsltd/financial-scorecard-system`

### **Step 2: Configure Deployment**
1. **Framework Preset:** Next.js
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)

### **Step 3: Add Environment Variables**
Before deploying, add this environment variable:
- **Name:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://web-production-7c20.up.railway.app/api/v1`

### **Step 4: Deploy**
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Get your Vercel URL (like: `https://financial-scorecard-system.vercel.app`)

### **Step 5: Update Railway CORS**
After frontend deploys, update Railway with frontend URL:
1. Go to Railway dashboard
2. Add environment variable to your backend service:
   - **Name:** `CORS_ORIGINS` 
   - **Value:** `https://your-vercel-url.vercel.app`

## 🎯 **Expected Result:**
- Full-stack application deployed
- Frontend connects to Railway backend API
- Authentication and all features working live

Let me know your Vercel URL when deployment completes!