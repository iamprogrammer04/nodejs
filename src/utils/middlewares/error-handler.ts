/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../custom-error';
import { createResponse, HTTP_STATUS } from '../response-creator';
import { logger } from '../logger';
// import mongoose from 'mongoose';

export const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction): void => {
  logger.warn(JSON.stringify(err));

  if (err instanceof CustomError) {
    res.status(err.code).json(createResponse(err.code, err.message, {}));
    return;
  }

  const customError = new CustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
  res.status(customError.code).json(createResponse(customError.code, err.message, {}));
  next(customError);
};
