import { Pool, QueryResult, QueryResultRow } from "pg";
import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";

/**
 * PostgreSQL connection pool
 *
 * Uses environment variables to configure host, port, database, user, and password.
 */
export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

/**
 * Execute a SQL query using the connection pool
 *
 * @template T - The type of each row in the query result (default: QueryResultRow)
 * @param text - SQL query string
 * @param params - Optional array of parameters for parameterized queries
 * @returns Promise resolving to QueryResult<T>
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  try {
    const result = await pool.query<T>(text, params as any[]);
    return result;
  } catch (error) {
    logger.error("Database query failed", {
      query: text,
      params,
      stack: (error as Error).stack,
    });
    throw error;
  }
}

/**
 * Verify database connection
 *
 * Attempts a simple query to ensure the PostgreSQL connection works.
 * Throws an error if the connection cannot be established.
 */
export async function assertDatabaseConnection() {
  try {
    await pool.query("SELECT 1;");
    logger.info("Connected to PostgreSQL successfully");
  } catch (error) {
    logger.error("Failed to connect to PostgreSQL", {
      stack: (error as Error).stack,
    });
    throw error;
  }
}
