import { createServer } from "node:http";
import { createApp } from "./app.js";
import { assertDatabaseConnection } from "./db/db.js";
import { logger } from "./lib/logger.js";
import { env } from "./config/env.js";

/**
 * Bootstraps the server
 *
 * Steps:
 * 1. Verify database connection
 * 2. Create and configure Express app
 * 3. Start HTTP server
 * 4. Log success or fail gracefully
 */
async function bootstrap() {
  try {
    // Ensure the database is reachable before starting the server
    await assertDatabaseConnection();

    // Create the Express app
    const app = createApp();

    // Create a native Node.js HTTP server from the Express app
    const server = createServer(app);

    // Use port from environment or default to 5000
    // const port = env.PORT || 5001;
    const port = 5005;

    // Start listening for incoming requests
    server.listen(port, () => {
      logger.info(`Server is now listening at http://localhost:${port}`);
    });
  } catch (error) {
    // Log failure and exit process
    logger.error("Failed to start the server", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    process.exit(1);
  }
}

// Start the server
bootstrap();
