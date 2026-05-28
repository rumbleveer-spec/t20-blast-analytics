import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Connection string should be set in .env.local on the VPS
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl && process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL environment variable is missing. Check your VPS .env configuration.');
}

const pool = new Pool({
  connectionString: dbUrl || 'postgresql://postgres:postgres@localhost:5432/t20_analytics',
});

// Initialize Drizzle with our schema for strongly-typed queries
export const db = drizzle(pool, { schema });
