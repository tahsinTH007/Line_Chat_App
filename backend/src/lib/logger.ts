import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} [${level}]: ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ""
  }`;
});

export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    isProduction ? json() : combine(colorize(), devFormat)
  ),
  transports: [
    new winston.transports.Console(),

    ...(isProduction
      ? [
          new winston.transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
          }),
          new winston.transports.File({
            filename: path.join("logs", "combined.log"),
          }),
        ]
      : []),
  ],
  exitOnError: false,
});
