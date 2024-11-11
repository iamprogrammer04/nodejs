import { Router } from 'express';
import catchAsync from '@/utils/catchAsync';
import { AuthController } from '@/modules/auth/auth.controller';
import { loginSchema, registerSchema } from '@/modules/auth/auth.validation';
import { exponentialBackoffRateLimiter } from '@/utils/middlewares/rate-limiting';
import validateJoiSchemas from '@/utils/validation-helpers/joi-validate';

const router = Router();

router.post(
  ['/sign-up', '/register'],
  validateJoiSchemas(registerSchema),
  catchAsync(AuthController.signUp),
);

router.post(
  ['/sign-in', '/login'],
  validateJoiSchemas(loginSchema),
  catchAsync(AuthController.login),
);

router.post(
  '/login',
  // validateJoiSchemas({
  //   params: {
  //     id: Joi.string().required(),
  //   },
  //   body: {
  //     firstName: Joi.string().required(),
  //   },
  // }),
  (req, res) => {
    // throw new CustomError(404, 'Products not found.');
    // throw new Error('SOMETHING');
    // throw new AssertionError({ message: 'OK' });
    // throw new MongooseError('SOME BAD ERRR');

    res.status(200).json({ message: 'Login successfully.' });
  },
);

router.post('/forget-password', exponentialBackoffRateLimiter);
router.post('/reset-password', exponentialBackoffRateLimiter);

router.post('/refresh-token');

router.post('/logout');

export default router;
