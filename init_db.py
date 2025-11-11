#!/usr/bin/env python3
"""
Database initialization script for Railway deployment
Creates all tables and runs any necessary setup
"""

import os
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from models.database import engine, create_tables
from models.entities import Base

def init_database():
    """Initialize the database with all tables"""
    try:
        print("Starting database initialization...")
        
        # Create all tables
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
        # Test database connection
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
            print("✅ Database connection test successful!")
            
        return True
        
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        return False

if __name__ == "__main__":
    success = init_database()
    if not success:
        sys.exit(1)
    print("🎉 Database initialization completed!")