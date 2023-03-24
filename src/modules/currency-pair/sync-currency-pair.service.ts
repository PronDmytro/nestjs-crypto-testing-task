import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { CurrencyPairService } from './currency-pair.service';
import { IAssetPairs } from '../../shared/interfaces/asset-pairs.interface';
import { CryptoCurrencyEnum } from '../../shared/enums/crypto-currency.enum';
import { FiatCurrencyEnum } from '../../shared/enums/fiat-currency.enum';
import { Prisma } from '@prisma/client';
import APP_CONFIG from '../../core/configs/app.config';

@Injectable()
export class SyncCurrencyPairService implements OnModuleInit {

  private readonly _logger = new Logger(SyncCurrencyPairService.name);

  constructor(
    private readonly _httpService: HttpService,
    private readonly _currencyPairService: CurrencyPairService,
  ) {
  }

  public async onModuleInit(): Promise<void> {
    if (!await this._currencyPairService.getCountAllPairs()) {
      await this.synchronizePairs();
    }
  }

  public async synchronizePairs(): Promise<void> {
    this._logger.log('Cron "SyncPairs" start');
    const assetsPairs = await lastValueFrom(this._fetchAllPairs());
    await this._syncPairsWithDb(assetsPairs);
    this._logger.log('Cron "SyncPairs" finished');
  }

  private _fetchAllPairs(): Observable<IAssetPairs> {
    return this._httpService.get<{ result: IAssetPairs }>(APP_CONFIG.assetPairsEndpointUrl)
      .pipe(map(({ data }) => data.result));
  }

  private async _syncPairsWithDb(pairs: IAssetPairs): Promise<void> {
    const dbPairsNames = await this._currencyPairService.getAllPairsNames();
    const mappedPairs = this._mapAssetPairs(pairs);

    if (!dbPairsNames.length) {
      const { count } = await this._currencyPairService.createPairs(mappedPairs);
      this._logger.log(`Created ${count} pairs`);
      return;
    }
    const pairsToCreate = mappedPairs.filter(({ name }) => !dbPairsNames.includes(name));
    const pairsToDelete = dbPairsNames.filter((dbName) => mappedPairs.some(({ name }) => name === dbName));

    if (pairsToCreate.length) {
      await this._currencyPairService.createPairs(pairsToCreate);
    }

    if (pairsToDelete.length) {
      for (const pair of pairsToDelete) {
        await this._currencyPairService.softDelete(pair);
      }
    }

    this._logger.log(`Created ${pairsToCreate.length} pairs`);
    this._logger.log(`Deleted ${pairsToDelete.length} pairs`);
  }

  private _mapAssetPairs(pairs: IAssetPairs): Prisma.CurrencyPairCreateInput[] {
    const cryptoCurrencies = Object.values<string>(CryptoCurrencyEnum);
    const fiatCurrencies = Object.values<string>(FiatCurrencyEnum);
    return Object.values(pairs).reduce((mapped, { wsname: name }) => {
      const [crypto, fiat] = name.split('/');
      return cryptoCurrencies.includes(crypto) && fiatCurrencies.includes(fiat) ? [...mapped, { name, crypto, fiat }] : mapped;
    }, []);
  }

}
