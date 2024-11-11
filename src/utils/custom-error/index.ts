export class CustomError extends Error {
  public code: number;
  public isOperational: boolean;

  constructor(code: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.code = code;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
