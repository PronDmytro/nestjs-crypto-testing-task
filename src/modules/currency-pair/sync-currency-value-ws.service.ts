import { Injectable, Logger } from '@nestjs/common';
import * as WebSocket from 'ws';
import APP_CONFIG from '../../core/configs/app.config';
import { CurrencyPairService } from './currency-pair.service';

@Injectable()
export class SyncCurrencyValueWsService {

  private readonly _ws = new WebSocket(APP_CONFIG.wsApiUrl);
  private readonly _logger = new Logger(SyncCurrencyValueWsService.name);

  constructor(
    private readonly _currencyPairService: CurrencyPairService,
  ) {
    this._initWs();
  }

  private async _initWs(): Promise<void> {
    this._ws.on('open', async () => {
      const pairs = await this._currencyPairService.getAllPairsNames();
      this._send({
        event: 'subscribe',
        pair: pairs,
        subscription: { name: 'ticker' },
      });
      this._logger.log(`Connected to pairs: [${pairs.toString()}]`, pairs);
    });

    this._ws.on('message', (message) => {
      const data = JSON.parse(message.toString());
      if (data?.event || !Array.isArray(data)) {
        return;
      }
      this._currencyPairService.updatePairValue(data[3], +data[1].p[0]);
    });
  }

  private _send(data: object): void {
    this._ws.send(JSON.stringify(data));
  }

}
