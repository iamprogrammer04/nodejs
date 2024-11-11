import winston from 'winston';
import 'winston-mongodb';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),

    // MongoDB Logging
    // new winston.transports.MongoDB({
    //   db: process.env.MONGODB_URI as string,
    //   collection: 'logs',
    //   options: { useUnifiedTopology: true },
    // }),
  ],
});
