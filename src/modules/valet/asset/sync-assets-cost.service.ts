import { Injectable, Logger } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CurrencyPairService } from '../../currency-pair/currency-pair.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SyncAssetsCostService {

  private readonly _logger = new Logger(SyncAssetsCostService.name);

  constructor(
    private readonly _assetService: AssetService,
    private readonly _currencyPairService: CurrencyPairService,
  ) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async _cronJob(): Promise<void> {
    this._logger.log('Cron "SyncAssetsCost" start');
    await this.syncAssetsCost();
    this._logger.log('Cron "SyncAssetsCost" finished');
  }

  private async syncAssetsCost(): Promise<void> {
    const assets = await this._assetService.getAllAssets();
    for (const asset of assets) {
      const pairVal = await this._currencyPairService.getPairValueById(asset.pairId);
      const cost = asset.count * pairVal;
      await this._assetService.changeAssetCostById(asset.id, cost);
    }
    this._logger.log(`Updated ${assets.length} assets`);
  }


}
