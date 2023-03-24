import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CreateAssetReqDto {

  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  public pairId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  public valetId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  public count: number;

}
