import type { Request, Response, NextFunction } from "express";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/error.js";

/**
 * Re-export Clerk utilities for centralized access.
 * This allows other modules to import from a single auth layer.
 */
export { clerkMiddleware, clerkClient, getAuth };

/**
 * Middleware to protect API routes by ensuring the user is authenticated.
 *
 * This middleware:
 * - Extracts authentication data from the request using Clerk
 * - Verifies that a valid user session exists
 * - Throws an UnauthorizedError if the user is not signed in
 *
 * Usage:
 * ```ts
 * app.get("/protected", requireAuthApi, controller);
 * ```
 *
 * @param req - Express request object
 * @param _res - Express response object (unused)
 * @param next - Express next middleware function
 */
export function requireAuthApi(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const auth = getAuth(req);

  if (!auth.userId) {
    return next(
      new UnauthorizedError("You must be signed in to access this resource")
    );
  }

  next();
}
