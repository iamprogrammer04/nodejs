import express, { Application } from 'express';
import { init } from './initializers';

const app: Application = express();

init(app);

export default app;
