#!/bin/bash
set -euo pipefail

echo "========================================"
echo "🚀 Starting Production Deployment"
echo "========================================"

# 1. Directory & Env Check
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: Must be run from the repository root."
    exit 1
fi

if [ ! -f ".env.local" ]; then
    echo "❌ ERROR: .env.local is missing! Run 'npm run deploy:setup' first."
    exit 1
fi

# 2. Check for Placeholder Secrets
if grep -q "postgres:postgres@localhost:5432" .env.local; then
    echo "❌ ERROR: .env.local still contains the placeholder DATABASE_URL."
    echo "Please edit .env.local with your real database credentials before deploying."
    exit 1
fi

echo "📦 1. Installing Dependencies..."
npm ci

echo "🗄️ 2. Pushing Database Schema..."
npm run db:push

echo "🌱 3. Seeding Database..."
npm run db:seed

echo "🏗️ 4. Building Next.js App..."
npm run build

echo "🔄 5. Starting/Restarting PM2 Process..."
# PM2 start fails if it already exists, so we use start or restart cleanly
pm2 start ecosystem.config.js || pm2 restart t20-lab
pm2 save

echo "========================================"
echo "🎉 Deployment Complete! App is running."
echo "========================================"
pm2 status t20-lab
