#!/usr/bin/env python3
"""
Ultra-simple startup script for Railway deployment
"""
import os
import uvicorn

if __name__ == "__main__":
    # Get port from Railway environment variable
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting server on port {port}")
    
    # Start the server
    uvicorn.run(
        "simple_app:app",
        host="0.0.0.0", 
        port=port,
        log_level="info",
        access_log=True
    )