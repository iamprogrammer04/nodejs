import { Application, json, urlencoded } from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import expressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { exponentialBackoffRateLimiter } from './utils/middlewares/rate-limiting';

import { authRoutes } from './routes';
import { errorHandler } from './utils/middlewares/error-handler';
import { CustomError } from './utils/custom-error';

function core(app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
}

function securityMiddleWare(app: Application) {
  app.use(compression());
  app.use(cors({ origin: '*', credentials: true }));
  app.use(helmet());
  app.use(hpp());
  app.use(expressMongoSanitize());

  // If rate limit globally
  app.use(
    rateLimit({
      limit: 10,
      windowMs: 60 * 60 * 1000,
      code: 429,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        code: 429,
        info: 'Too Many Requests',
        message: 'Too many requests from this IP, please try again later',
        status: false,
        timestamp: new Date().toISOString(),
      },
    }),
  );

  // Exponential Backoff
  app.use(exponentialBackoffRateLimiter);
}

function routes(app: Application) {
  app.use('/api/v1/auth', authRoutes);
}

function globalErrorHandler(app: Application) {
  app.use((req, _res, next) => {
    next(
      new CustomError(
        404,
        `Not Found- ${req.protocol + '://' + req.get('host') + req.originalUrl}`,
      ),
    );
  });
  app.use(errorHandler);
}

export function init(app: Application) {
  core(app);
  securityMiddleWare(app);
  routes(app);
  globalErrorHandler(app);
}
