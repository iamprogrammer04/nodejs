import Joi from 'joi';
import { REGEX } from '../constants/regex-patterns';

export const idValidation = {
  params: Joi.object({
    id: Joi.string().required().pattern(REGEX.MONGO_ID_REGEX).messages({
      'string.pattern.base': 'Invalid Mongo ID format',
    }),
  }),
};
