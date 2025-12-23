export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 400
export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details?: unknown) {
    super(400, message, details);
  }
}

// 401
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

// 403
export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

// 404
export class NotFoundError extends HttpError {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}

// 405
export class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed") {
    super(405, message);
  }
}

// 409
export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

// 422
export class ValidationError extends HttpError {
  constructor(message = "Validation Failed", details?: unknown) {
    super(422, message, details);
  }
}

// 429
export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests") {
    super(429, message);
  }
}

// 500
export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", details?: unknown) {
    super(500, message, details);
  }
}

// 502
export class BadGatewayError extends HttpError {
  constructor(message = "Bad Gateway") {
    super(502, message);
  }
}

// 503
export class ServiceUnavailableError extends HttpError {
  constructor(message = "Service Unavailable") {
    super(503, message);
  }
}

// 504
export class GatewayTimeoutError extends HttpError {
  constructor(message = "Gateway Timeout") {
    super(504, message);
  }
}
