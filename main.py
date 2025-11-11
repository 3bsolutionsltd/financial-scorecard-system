from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models.database import SessionLocal
from api.endpoints import router as api_router
import uvicorn
import os
from datetime import datetime

# Production-ready FastAPI configuration
app = FastAPI(
    title="Financial Scorecard System",
    description="A comprehensive financial risk assessment and scorecard system",
    version="1.0.0",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None
)

# Production CORS settings
if os.getenv("ENVIRONMENT") == "production":
    allowed_origins = os.getenv("CORS_ORIGINS", "").split(",")
else:
    allowed_origins = [
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:3001"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Include API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Financial Scorecard System API",
        "version": "1.0.0",
        "status": "operational",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Financial Scorecard API is running",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/health/full")
def full_health_check():
    try:
        # Test database connection
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
    
    return {
        "status": "healthy" if "healthy" in db_status else "degraded",
        "database": db_status,
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
