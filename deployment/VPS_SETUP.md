# VPS Setup & Deployment Guide: Operator Edition

This guide has been optimized for maximum autonomy and minimal operator error. Read thoroughly before running commands.

## 🏁 START HERE: Ultra-Short Operator Guide
**First time on VPS:**
1. Run `npm run deploy:setup`
2. Edit `.env.local` (Add your database URL)
3. Run `npm run deploy:prod`

**Later updates (Normal Redeploy):**
1. Run `git pull origin main`
2. Run `npm run deploy:prod`

*Note: First-time setup cannot be safely reduced to a single command because `.env.local` strictly requires manual, secure secret injection before the database schema and application build can occur.*

---

## 0. Preflight Checklist
Before executing any VPS commands, verify the following:

- [ ] **VPS Ownership**: You are logged into your Ubuntu 22.04+ VPS via SSH.
- [ ] **Directory Position**: You must be in the cloned repository root.
  * *Confirmation Command*: `pwd` (Should end in `/t20-blast-analytics`)
  * *Confirmation Command*: `ls -l ecosystem.config.js` (Must exist)
- [ ] **Secrets Prepared**: You must have your `DATABASE_URL` and `INGESTION_SECRET` ready to paste.
- [ ] **Required Binaries Available**:
  * Docker & Docker Compose (`docker compose version`)
  * Node.js v18+ (`node -v`)
  * PM2 (`pm2 -v`)
  *(If missing, the `deploy:setup` script will catch most of these and warn you).*

---

## 1. First-Time VPS Setup (Copy-Paste Block)
Execute these commands exactly as written from the project root:

```bash
# A. Install dependencies and run preflight setup (starts Postgres)
npm ci
npm run deploy:setup
```

### 1a. Verification: Docker Compose Up
* **Expected Output**: "✅ Database container is running." and a prompt that `.env.local` was copied.
* **Failure Interpretation**: If Docker errors out, ensure the daemon is running (`sudo systemctl status docker`) and your user is in the `docker` group.

### 1b. Environment Creation
The setup script will copy `.env.example` to `.env.local` and exit.
```bash
# B. Edit the secrets
nano .env.local
```
* **Post-Command Verification**: Run `cat .env.local | grep DATABASE_URL` to ensure it saved.

### 1c. Production Deployment
```bash
# C. Run the full deployment pipeline
npm run deploy:prod
```

### 1d. Verification: DB Push & Seed
* **Expected Output**: Drizzle outputs "Apply changes..." and the seed script prints "Seeding completed successfully!".
* **Failure Interpretation**: If connection fails or you see a placeholder error, your `DATABASE_URL` in `.env.local` is wrong, or the Docker container isn't fully healthy yet.

### 1e. Verification: Build
* **Expected Output**: Next.js compiles chunks and creates the `.next` directory.
* **Failure Interpretation**: OOM (Out of Memory) kills. If this happens, your VPS needs a swap file.

### 1f. Verification: PM2 Start
* **Expected Output**: PM2 shows a table with `t20-lab` in the `online` state.
* **Failure Interpretation**: If it says `errored`, check logs with `pm2 logs t20-lab`.

---

## 2. Normal Redeploy (Copy-Paste Block)
When pulling new code in the future:
```bash
git pull origin main
npm run deploy:prod
```

---

## 3. How to Confirm the App is Really Live
1. **Local Process Check**: Run `curl http://localhost:3000`. You should see the HTML of the Next.js app.
2. **PM2 Logs**: Run `pm2 logs t20-lab --lines 50`. Look for "Ready in Xms".
3. **External Browser**: Visit `http://YOUR_VPS_IP:3000` (if firewall allows) or your domain if Nginx is configured.

---

## 4. Troubleshooting Block

### Common Operator Mistakes ("Do Not Do This")
- ❌ **DO NOT run `npm start` manually** on the server. Always use PM2 so it survives crashes and reboots.
- ❌ **DO NOT commit `.env.local`** to Git.
- ❌ **DO NOT run `docker-compose`** (with hyphen). Use `docker compose` (V2 standard).
- ❌ **DO NOT change `ecosystem.config.js`** blindly. It is strictly tied to `npm run deploy:prod`.

### Recovery Paths
- **If DB seeding partially fails**: Run `docker compose restart db`, wait 5 seconds, and re-run `npm run deploy:prod`. (The script is idempotent because it clears tables first).
- **If Next.js build hangs**: Run `free -m` to check memory. If low, run:
  ```bash
  sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
  ```
- **If PM2 is stuck**: Run `pm2 kill` and then `npm run deploy:prod` again to cleanly spin it up.
