import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidCurrencyPairName } from '../../../shared/validators/is-valid-currency-pair-name';

export class CurrencyPairParamsReqDto {

  @ApiProperty({ type: 'array' })
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsValidCurrencyPairName({ each: true })
  public pairs: string[];

}
