import type { ErrorRequestHandler } from "express";
import { HttpError } from "../lib/error.js";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

/**
 * Global Express error handling middleware.
 *
 * This middleware:
 * - Handles application-specific HttpError instances
 * - Handles Zod validation errors
 * - Falls back to a safe 500 response for unknown errors
 * - Logs errors in a structured and secure way
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // Default response values for unhandled or unknown errors
  let status = 500;
  let message = "Internal Server Error";
  let details: unknown | undefined;

  // Handle custom HTTP errors thrown by the application
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    details = err.details;
  }

  // Handle request validation errors from Zod
  else if (err instanceof ZodError) {
    status = 400;
    message = "Invalid request data";
    details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Log error information without exposing sensitive data
  logger.error("Request failed", {
    method: req.method,
    url: req.originalUrl,
    status,
    message,
    // Include stack trace only outside production
    stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  });

  // Prepare error response object
  const response: {
    success: false;
    error: {
      message: string;
      status: number;
      details?: unknown;
    };
  } = {
    success: false,
    error: {
      message,
      status,
    },
  };

  // Attach details only when they exist
  if (details !== undefined) {
    response.error.details = details;
  }

  // Send final error response to the client
  res.status(status).json(response);
};
