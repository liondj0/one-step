import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/dist/types/utils/http-status";

export abstract class AppError extends HTTPException {
  constructor(
    message: string,
    readonly statusCode: ContentfulStatusCode,
  ) {
    super(statusCode, { message });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}
