export abstract class ApiError extends Error {
  name = "ApiError";
  statusCode = 400;
}

export class UnauthorizedError extends ApiError {
  name = "UnauthorizedError";
  statusCode = 401;
}

export class ForbiddenError extends ApiError {
  name = "ForbiddenError";
  statusCode = 403;
}

export class NotFoundError extends ApiError {
  name = "NotFoundError";
  statusCode = 404;
}

export class ProjectRevisionError extends ApiError {
  name = "ProjectRevisionError";
  statusCode = 412;
}

export class SchemaMismatchError extends ApiError {
  name = "SchemaMismatchError";
  statusCode = 412;
}

export class StaleCliError extends ApiError {
  name = "StaleCliError";
  statusCode = 426;
}

export class BadRequestError extends ApiError {
  name = "BadRequestError";
  statusCode = 400;
}

export class AuthError extends ApiError {
  name = "AuthError";
  statusCode = 403;
}

export class UnknownReferencesError extends ApiError {
  name = "UnknownReferencesError";
  statusCode = 412;
}

export class BundleTypeError extends ApiError {
  name = "BundleTypeError";
  statusCode = 412;
}

export class CopilotRateLimitExceededError extends ApiError {
  name = "CopilotRateLimitExceededError";
  statusCode = 429;
}

/**
 * We can't simply use instanceof ApiError, since our build pipeline doesn't
 * handle extending Error correctly. class extends Error works fine with
 * instanceof in normal ES6, but not in our TS compiles.
 */
export function isApiError(err: Error): err is ApiError {
  return !!(err as any).statusCode;
}

const errorNameRegistry = {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ProjectRevisionError,
  SchemaMismatchError,
  StaleCliError,
  AuthError,
  UnknownReferencesError,
  BundleTypeError,
  EntityNotFound: NotFoundError,
  BadRequestError,
  CopilotRateLimitExceededError,
};

/**
 * We can't simply use instanceof DbMgrError, since our build pipeline doesn't
 * handle extending Error correctly. class extends Error works fine with
 * instanceof in normal ES6, but not in our TS compiles.
 */
export function transformErrors(err: Error): Error {
  if (
    err.message === "CSRF token missing" ||
    err.message === "CSRF token mismatch"
  ) {
    return new AuthError(err.message);
  }
  const transformedErrType = errorNameRegistry[err.name];
  if (transformedErrType) {
    err = new transformedErrType(err.message);
  }
  return err;
}
