#!/bin/bash
set -e

echo "🚀 Starting VPS Preflight & Setup..."

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node v18+."
    exit 1
fi
echo "✅ Node.js found: $(node -v)"

# 2. Check PM2
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 is not installed. Installing PM2 globally..."
    npm install -g pm2
else
    echo "✅ PM2 found: $(pm2 -v)"
fi

# 3. Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and Docker Compose."
    exit 1
fi
echo "✅ Docker found: $(docker --version)"

# 4. Spin up Database
echo "📦 Starting PostgreSQL via Docker Compose..."
docker compose up -d
echo "✅ Database container started."

# 5. Check .env.local
if [ ! -f .env.local ]; then
    echo "⚠️ .env.local not found! Copying from .env.example..."
    cp .env.example .env.local
    echo "❌ YOU MUST EDIT .env.local NOW TO SET DATABASE_URL AND INGESTION_SECRET."
    echo "Run: nano .env.local"
    exit 1
fi

echo "✅ .env.local exists."
echo "🎉 Setup Preflight Complete! You can now run: npm run deploy:prod"
