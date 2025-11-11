from fastapi import FastAPI
import os

# Absolutely minimal FastAPI app
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello Railway!", "port": os.getenv("PORT", "unknown")}

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)