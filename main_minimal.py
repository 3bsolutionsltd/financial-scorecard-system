from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime

# Temporarily disable problematic imports for Railway deployment
# from sqlalchemy.orm import Session
# from models.database import SessionLocal
# from api.endpoints import router as api_router

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
    allowed_origins = os.getenv("CORS_ORIGINS", "").split(",") if os.getenv("CORS_ORIGINS") else []
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

# Database Dependency - Temporarily disabled
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# Include API router - Temporarily disabled
# app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Financial Scorecard System API",
        "version": "1.0.0",
        "status": "operational (minimal mode)",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("ENVIRONMENT", "development"),
        "note": "Database and API endpoints temporarily disabled for deployment testing"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Financial Scorecard API is running (minimal mode)",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "port": os.getenv("PORT", "8000")
    }

@app.get("/test")
def test_endpoint():
    return {
        "test": "successful",
        "message": "API test endpoint working",
        "timestamp": datetime.now().isoformat(),
        "cors_origins": os.getenv("CORS_ORIGINS", "not set"),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)