import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { PINO_LOGGER_CONFIG } from './core/configs/pino-logger.config';
import { CurrencyPairModule } from './modules/currency-pair/currency-pair.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { ValetModule } from './modules/valet/valet.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    LoggerModule.forRoot(PINO_LOGGER_CONFIG),
    ScheduleModule.forRoot(),
    CurrencyPairModule,
    PrismaModule,
    AuthModule,
    ValetModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
