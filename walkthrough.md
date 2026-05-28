# T20 Analytics Lab - Deployment Walkthrough

## Summary of Completed Autonomous Actions
- **Aligned Configurations:** Ensured `ecosystem.config.js` app name (`t20-lab`), `docker-compose.yml` DB settings, `.env.example`, and Drizzle settings are perfectly matched.
- **Updated Deployment Docs:** Completely rewrote `deployment/VPS_SETUP.md` to precisely reflect the required order of operations (Docker -> Env -> Push -> Seed -> Build -> PM2).
- **Git State:** Automatically committed all modified files and configurations.
- **Progress Sync:** Logged the latest deployment status automatically into Apple Notes under "T20 Analytics Lab – Deployment Progress".

## Verified by Execution
- Git repository status is completely clean and tracked.
- Apple Notes was successfully updated via script.
- Next.js builds successfully (from prior run history).

## Verified by Inspection
- `ecosystem.config.js` specifies `next start` and `t20-lab`.
- `drizzle.config.ts` points to `.env.local`.
- `docker-compose.yml` configures PostgreSQL 15 on port 5432.
- `src/db/seed.ts` reads from `.env.local`.
- `package.json` scripts are fully aligned (`db:generate`, `db:push`, `db:seed`, `db:studio`).

## Genuinely Blocked
- Local testing of `db:push` and `db:seed` is blocked due to the lack of a running Docker environment locally in the previous session (resulting in a cascade ID mismatch error when attempted).

## Next Unavoidable Manual Action
The operator must switch context to the actual VPS, ensure the repo is cloned, and start the database environment:

```bash
docker compose up -d
```
