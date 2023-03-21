import APP_CONFIG from './app.config';
import { Params } from 'nestjs-pino';
import * as colorette from 'colorette';

export const PINO_LOGGER_CONFIG: Params = {
  pinoHttp: [
    {
      level: APP_CONFIG.env.prod ? 'info' : 'debug',
      transport: !APP_CONFIG.env.prod ? {
        target: 'pino-pretty',
        options: {
          colorize: colorette.isColorSupported,
          levelFirst: true,
          messageFormat: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          hideObject: false,
          singleLine: false,
        },
      } : null,
      base: null,
    }, null,
  ],
};
