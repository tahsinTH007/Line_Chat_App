import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../lib/error.js";

/**
 * Middleware to handle unmatched routes.
 *
 * If a request does not match any route, this middleware
 * will create a NotFoundError and pass it to the global
 * error handler.
 *
 * @param _req Express Request object
 * @param _res Express Response object
 * @param next Express NextFunction
 */
export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new NotFoundError("Route not found"));
}
