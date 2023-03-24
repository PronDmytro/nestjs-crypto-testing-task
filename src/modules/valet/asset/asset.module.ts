import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { PrismaModule } from '../../../core/prisma/prisma.module';
import { CurrencyPairModule } from '../../currency-pair/currency-pair.module';
import { SyncAssetsCostService } from './sync-assets-cost.service';

@Module({
  imports: [
    PrismaModule,
    CurrencyPairModule,
  ],
  controllers: [
    AssetController,
  ],
  providers: [
    AssetService,
    SyncAssetsCostService,
  ],
})
export class AssetModule {
}
