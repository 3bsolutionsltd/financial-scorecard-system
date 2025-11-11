#!/usr/bin/env python3
"""
Startup script for Railway deployment with database initialization
"""
import os
import sys
import uvicorn
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

def initialize_database():
    """Initialize database tables"""
    try:
        from models.database import engine
        from models.entities import Base
        
        print("Initializing database...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database initialized successfully!")
        return True
    except Exception as e:
        print(f"⚠️  Database initialization warning: {e}")
        return False

if __name__ == "__main__":
    # Initialize database first
    initialize_database()
    
    # Get port from Railway environment variable
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting server on port {port}")
    
    # Start the server with the main application
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=port,
        log_level="info",
        access_log=True
    )