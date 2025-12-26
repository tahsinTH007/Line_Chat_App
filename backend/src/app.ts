import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { clerkMiddleware } from "./config/clerk.js";
import { apiRouter } from "./routes/index.js";

/**
 * Creates and configures the Express application.
 *
 * Applies security, parsing, CORS, and global middleware.
 *
 * @returns Configured Express application instance
 */
export function createApp(): Express {
  const app = express();

  // Set clerk middleware
  app.use(clerkMiddleware());

  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS for the frontend
  app.use(
    cors({
      origin: ["http://localhost:3000"], // allow only this frontend origin
      credentials: true, // allow cookies
    })
  );

  // Parse incoming JSON requests
  app.use(express.json());

  //All API routes
  app.use("/api", apiRouter);

  // Handle unmatched routes
  app.use(notFoundHandler);

  // Global error handling middleware
  app.use(errorHandler);

  return app;
}
