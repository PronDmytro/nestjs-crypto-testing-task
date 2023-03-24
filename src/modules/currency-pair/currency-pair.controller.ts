import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { CurrencyPairService } from './currency-pair.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyPairParamsReqDto } from './dto/currency-pair-params.req.dto';
import { CurrencyPairValueResDto } from './dto/currency-pair-value.res.dto';

@ApiTags('Currency Pair')
@Controller('currency-pair')
export class CurrencyPairController {

  constructor(
    private readonly _currencyPairService: CurrencyPairService,
  ) {
  }

  @Get()
  public async getPairs(@Query() { pairs }: CurrencyPairParamsReqDto): Promise<CurrencyPairValueResDto[]> {
    const result: CurrencyPairValueResDto[] = [];
    for (const pairName of pairs) {
      if (!pairName) {
        continue;
      }

      const pair = await this._currencyPairService.getPairByName(pairName);
      if (!pair) {
        throw new NotFoundException(`Not found: ${pairName}`);
      }
      result.push(pair);
    }

    return result;
  }

}
