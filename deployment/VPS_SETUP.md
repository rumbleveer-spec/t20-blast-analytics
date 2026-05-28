# VPS Setup & Deployment Guide

This guide covers deploying the T20 Blast 2026 Analytics Lab on your VPS.

## Prerequisites
1. **Docker & Docker Compose**: Required for PostgreSQL.
2. **Node.js**: Ensure Node v18+ is installed.
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **PM2**: Install process manager globally.
   ```bash
   sudo npm install -g pm2
   ```

## Deployment Workflow

1. **Clone & Install**
   ```bash
   git clone git@github.com:rumbleveer-spec/t20-blast-analytics.git
   cd t20-blast-analytics
   npm ci
   ```

2. **Start Database Services**
   ```bash
   docker compose up -d
   ```

3. **Environment Variables**
   Create `.env.local` using `.env.example` as a template. Make sure to specify the credentials:
   ```bash
   cp .env.example .env.local
   nano .env.local
   # Ensure DATABASE_URL and INGESTION_SECRET are set properly.
   ```

4. **Run Database Migrations and Seed**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Build the Application**
   ```bash
   npm run build
   ```

6. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

   *Note: If updating an existing deployment, use `pm2 restart t20-lab`.*

## Nginx Reverse Proxy (Optional)
Create a new site config in `/etc/nginx/sites-available/t20-analytics`:

```nginx
server {
    listen 80;
    server_name analytics.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable it and reload:
```bash
sudo ln -s /etc/nginx/sites-available/t20-analytics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
