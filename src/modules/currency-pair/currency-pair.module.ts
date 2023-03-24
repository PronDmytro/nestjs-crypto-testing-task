import { Module } from '@nestjs/common';
import { CurrencyPairController } from './currency-pair.controller';
import { CurrencyPairService } from './currency-pair.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { SyncCurrencyPairService } from './sync-currency-pair.service';
import { HttpModule } from '@nestjs/axios';
import { SyncCurrencyValueWsService } from './sync-currency-value-ws.service';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
  ],
  controllers: [
    CurrencyPairController,
  ],
  providers: [
    CurrencyPairService,
    SyncCurrencyPairService,
    SyncCurrencyValueWsService,
  ],
  exports: [
    CurrencyPairService,
  ],
})
export class CurrencyPairModule {
}
