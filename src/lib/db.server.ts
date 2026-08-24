import process from "node:process";
import { Pool } from "pg";

let pool: Pool | null = null;

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabase(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL belum dikonfigurasi. Hubungkan PostgreSQL ke aplikasi.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: process.env.PGSSL === "disable" ? undefined : { rejectUnauthorized: false },
      max: Number(process.env.PG_POOL_MAX ?? 10),
      idleTimeoutMillis: 30_000,
    });
  }

  return pool;
}
