FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy minimal requirements first for better caching
COPY requirements-minimal.txt ./requirements.txt

# Install minimal Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application (Railway will set PORT automatically)
CMD ["sh", "-c", "uvicorn minimal_main:app --host 0.0.0.0 --port ${PORT:-8000}"]