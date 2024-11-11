import { join, resolve } from 'path';
import { config } from 'dotenv';

const ENV_PATH = join(resolve(), '.env');

config({ path: ENV_PATH });
