import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { UpdateAssetCountParamReqDto } from './dto/update-asset-count-param.req.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RemoveAssetParamReqDto } from './dto/remove-asset-param.req.dto';
import { CreateAssetReqDto } from './dto/create-asset.req.dto';
import { UpdateAssetCountReqDto } from './dto/update-asset-count.req.dto';
import { CurrencyPairService } from '../../currency-pair/currency-pair.service';

@ApiTags('Asset controller')
@ApiBearerAuth()
@Controller('valet/asset')
export class AssetController {

  constructor(
    private readonly _assetService: AssetService,
    private readonly _currencyPairService: CurrencyPairService,
  ) {
  }

  @Post()
  public async createAsset(
    @Body() { pairId, valetId, count }: CreateAssetReqDto,
  ): Promise<void> {
    const { name: pairName } = await this._currencyPairService.getPairById(pairId);
    const currencyPairVal = await this._currencyPairService.getPairValueByName(pairName);
    const cost = count * currencyPairVal;
    await this._assetService.createAsset({
      valet: { connect: { id: valetId } },
      pair: { connect: { id: pairId } },
      count,
      cost,
    });
  }

  @Patch(':id')
  public async updateAssetCount(
    @Param() { id }: UpdateAssetCountParamReqDto,
    @Body() { count }: UpdateAssetCountReqDto,
  ): Promise<void> {
    await this._assetService.changeAssetCountById(id, count);
  }

  @Delete(':id')
  public async removeAsset(
    @Param() { id }: RemoveAssetParamReqDto,
  ): Promise<void> {
    await this._assetService.removeAssetById(id);
  }

}
