import Joi from 'joi';

export const registerSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(18),
  },
};

export const loginSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(18),
  },
};
