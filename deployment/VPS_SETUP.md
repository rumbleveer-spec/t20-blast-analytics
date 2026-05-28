# VPS Setup & Deployment Guide

This guide covers deploying the T20 Blast 2026 Analytics Lab on your Ubuntu 22.04 VPS.

## Prerequisites
1. **Node.js**: Ensure Node v18+ is installed.
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
2. **PM2**: Install process manager globally.
   ```bash
   sudo npm install -g pm2
   ```

## 1. Clone & Build
```bash
git clone git@github.com:rumbleveer-spec/t20-blast-analytics.git
cd t20-blast-analytics
npm ci
npm run build
```

## 2. Start with PM2
```bash
pm2 start npm --name "t20-analytics" -- start
pm2 save
pm2 startup
```

## 3. Nginx Reverse Proxy
Create a new site config in `/etc/nginx/sites-available/t20-analytics`:

```nginx
server {
    listen 80;
    server_name analytics.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
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

## 4. SSL Setup
Run certbot to secure your connection:
```bash
sudo certbot --nginx -d analytics.yourdomain.com
```
