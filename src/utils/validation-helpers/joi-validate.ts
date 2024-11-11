import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationResult } from 'joi';
import { HTTP_STATUS } from '../response-creator';
import { CustomError } from '../custom-error';

interface IValidatedSchema {
  params?: object;
  query?: object;
  body?: object;
}

const validateJoiSchemas = (schema: IValidatedSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validSchema: Partial<IValidatedSchema> = {
      params: schema.params,
      query: schema.query,
      body: schema.body,
    };

    const objectToValidate: Record<string, unknown> = {};

    if (validSchema.params) {
      objectToValidate.params = req.params;
    } else {
      delete objectToValidate.params;
      delete validSchema.params;
    }

    if (validSchema.query) {
      objectToValidate.query = req.query;
    } else {
      delete objectToValidate.query;
      delete validSchema.query;
    }

    if (validSchema.body) {
      objectToValidate.body = req.body;
    } else {
      delete objectToValidate.body;
      delete validSchema.body;
    }

    const validationResult: ValidationResult = Joi.object(validSchema)
      .prefs({
        errors: { label: 'key' },
        abortEarly: false,
      })
      .validate(objectToValidate);

    const { error, value } = validationResult;

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new CustomError(HTTP_STATUS.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);

    return next();
  };
};

export default validateJoiSchemas;
