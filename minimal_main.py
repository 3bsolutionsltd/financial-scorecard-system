from fastapi import FastAPI
from datetime import datetime
import os

# Minimal FastAPI app for Railway deployment testing
app = FastAPI(
    title="Financial Scorecard System - Minimal",
    description="Minimal version for Railway deployment testing",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Financial Scorecard System API - Minimal Version",
        "status": "operational",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Minimal API is running successfully",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "port": os.getenv("PORT", "8000"),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/test")
def test_endpoint():
    return {
        "test": "successful",
        "message": "Test endpoint is working",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)