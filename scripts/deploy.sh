#!/bin/bash
set -e

echo "🚀 Starting Production Deployment..."

echo "📦 1. Installing Dependencies..."
npm ci

echo "🗄️ 2. Pushing Database Schema..."
npm run db:push

echo "🌱 3. Seeding Database..."
npm run db:seed

echo "🏗️ 4. Building Next.js App..."
npm run build

echo "🔄 5. Starting/Restarting PM2 Process..."
pm2 start ecosystem.config.js || pm2 restart t20-lab
pm2 save

echo "🎉 Deployment Complete! App is running in PM2."
pm2 status t20-lab
