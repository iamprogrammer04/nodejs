import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const violationTracker: Record<string, number> = {};

const getBackoffDelay = (violations: number): number => {
  return Math.min(60 * 60 * 1000 * 2 ** (violations - 1), 24 * 60 * 60 * 1000); // Max delay: 24 hours
};

export const exponentialBackoffRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Initial rate limit window: 1 hour
  max: (req: Request): number => {
    const ip = req.ip ?? ''; // Fallback to an empty string if req.ip is undefined
    const violations = violationTracker[ip] || 0;
    return violations > 0 ? 10 / 2 ** violations : 10; // Reduce max requests with each violation
  },
  handler: (req: Request, res: Response) => {
    const ip = req.ip ?? ''; // Fallback to an empty string if req.ip is undefined
    violationTracker[ip] = (violationTracker[ip] || 0) + 1;

    const violations = violationTracker[ip];
    const backoffDelay = getBackoffDelay(violations);

    res.status(429).json({
      code: 429,
      info: 'Too Many Requests',
      message: `Too many requests from this IP, please try again in ${backoffDelay / 1000 / 60} minutes.`,
      status: false,
      timestamp: new Date().toISOString(),
      retryAfter: backoffDelay / 1000,
    });

    setTimeout(() => {
      if (violationTracker[ip] > 0) {
        violationTracker[ip] -= 1;
      } else {
        delete violationTracker[ip];
      }
    }, backoffDelay);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
