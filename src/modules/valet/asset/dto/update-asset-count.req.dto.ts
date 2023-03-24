import { Transform } from 'class-transformer';
import { Min } from 'class-validator';

export class UpdateAssetCountReqDto {

  @Transform(({ value }) => Number(value))
  @Min(0)
  public count: number;

}
