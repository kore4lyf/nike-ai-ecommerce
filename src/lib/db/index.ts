import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Use SQLite for local development
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

// Fallback to mock data if database connection fails
let dbInstance: any = null;

try {
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    dbInstance = drizzle(sql);
  }
} catch (error) {
  console.warn('Database connection failed, using mock data:', error);
}

export const db = dbInstance;