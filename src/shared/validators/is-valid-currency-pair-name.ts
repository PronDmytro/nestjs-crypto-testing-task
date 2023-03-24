import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CryptoCurrencyEnum } from '../enums/crypto-currency.enum';
import { FiatCurrencyEnum } from '../enums/fiat-currency.enum';

export function IsValidCurrencyPairName(
  validationOptions?: ValidationOptions,
) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidCurrencyPairNameConstraint,
    });
  };
}

@Injectable()
@ValidatorConstraint({ name: 'IsValidCurrencyPairName', async: false })
export class IsValidCurrencyPairNameConstraint implements ValidatorConstraintInterface {

  private readonly cryptoCurrencies = Object.values<string>(CryptoCurrencyEnum);
  private readonly fiatCurrencies = Object.values<string>(FiatCurrencyEnum);

  public async validate(name: string, args: ValidationArguments): Promise<boolean> {
    const [crypto, fiat] = name.split('/');
    return this.cryptoCurrencies.includes(crypto) && this.fiatCurrencies.includes(fiat);
  }

  public defaultMessage(args: ValidationArguments) {
    return 'Unavailable currency pair name';
  }

}
