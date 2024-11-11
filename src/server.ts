import './config/env';
import ENV_VARS from './utils/constants/env-variables';
import app from './app';
import { connectDB } from './config/db.mongo';

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
  void connectDB();
  console.log(`PORT: ${PORT}`);
});
