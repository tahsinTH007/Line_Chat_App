import path from "node:path";
import { logger } from "../lib/logger.js";
import fs from "node:fs";
import { query } from "./db.js";

const migrateDir = path.resolve(process.cwd(), "src", "migrations");

async function runMigrations() {
  logger.info(`Looking for migrations in ${migrateDir}`);

  const files = fs
    .readdirSync(migrateDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    logger.info("No migrations found");
    return;
  }

  for (const file of files) {
    const fullPath = path.join(migrateDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");

    logger.info("Running migrations");

    await query(sql);

    logger.info("Finished migrations");
  }
}

runMigrations()
  .then(() => {
    logger.info("All migrations run successfully");
    process.exit(0);
  })
  .catch((err) => {
    logger.error(`Migrations failed, Error:${(err as Error).message}`);
    process.exit(1);
  });
