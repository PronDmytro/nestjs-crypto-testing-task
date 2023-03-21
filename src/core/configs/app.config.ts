import { config } from 'dotenv';
import { join } from 'path';
import * as util from 'util';

const env: NodeJS.ProcessEnv = process.env;
config({ path: join(__dirname, '../../../src/.env') });

const isProdEnv = env.NODE_ENV === 'production';
const isTestEnv = env.NODE_ENV === 'test';
const isDevEnv = env.NODE_ENV === 'development' || (!isProdEnv && !isTestEnv);

const APP_CONFIG = {
  env: {
    prod: isProdEnv,
    test: isTestEnv,
    dev: isDevEnv,
  },
  port: Number(env.PORT) || 3000,
  apiPrefix: env.API_PREFIX,
};

if (isDevEnv) {
  console.log(util.inspect(APP_CONFIG, false, null, true));
}

export default APP_CONFIG;

function parseBool(value: unknown, defaultValue = false): boolean {
  if (typeof value === 'undefined') {
    return defaultValue;
  }

  if (value === 'true' || value == 1 || value === true) {
    return true;
  }

  if (value === 'false' || value == 0 || value === false) {
    return false;
  }

  throw new Error('appConf#parseBool: can not parse boolean value' + value);
}
