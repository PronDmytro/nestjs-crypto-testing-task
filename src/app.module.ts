import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { PINO_LOGGER_CONFIG } from './core/configs/pino-logger.config';

@Module({
  imports: [
    LoggerModule.forRoot(PINO_LOGGER_CONFIG),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
