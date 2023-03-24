import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { PINO_LOGGER_CONFIG } from './core/configs/pino-logger.config';
import { CurrencyPairModule } from './modules/currency-pair/currency-pair.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [
    LoggerModule.forRoot(PINO_LOGGER_CONFIG),
    CurrencyPairModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
