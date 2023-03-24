import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class RemoveAssetParamReqDto {

  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  public id: number;

}
