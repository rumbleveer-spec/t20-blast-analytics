#!/bin/bash
set -euo pipefail

echo "========================================"
echo "🚀 VPS Preflight & Setup "
echo "========================================"

# 1. Directory Check
if [ ! -f "package.json" ] || [ ! -f "ecosystem.config.js" ]; then
    echo "❌ ERROR: Must be run from the repository root (where ecosystem.config.js lives)."
    exit 1
fi

# 2. Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "❌ ERROR: Node.js is not installed. Please install Node v18+."
    exit 1
fi
echo "✅ Node.js found: $(node -v)"

# 3. Check PM2
if ! command -v pm2 >/dev/null 2>&1; then
    echo "⚠️ PM2 not found. Installing globally..."
    npm install -g pm2
else
    echo "✅ PM2 found: $(pm2 -v | tail -n 1)"
fi

# 4. Check Docker
if ! command -v docker >/dev/null 2>&1; then
    echo "❌ ERROR: Docker is not installed."
    exit 1
fi
echo "✅ Docker found: $(docker --version)"

# 5. Spin up Database
echo "📦 Starting PostgreSQL via Docker Compose..."
docker compose up -d
echo "✅ Database container is running."

# 6. Check .env.local
if [ ! -f .env.local ]; then
    echo "⚠️ .env.local not found! Creating from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "=========================================================================="
    echo "❌ ACTION REQUIRED: Setup paused."
    echo "You must now edit .env.local and insert your real DATABASE_URL."
    echo "Run: nano .env.local"
    echo "After saving, resume deployment by running: npm run deploy:prod"
    echo "=========================================================================="
    exit 0
fi

echo "✅ .env.local exists."
echo "🎉 Preflight complete! If your secrets are set, run: npm run deploy:prod"
