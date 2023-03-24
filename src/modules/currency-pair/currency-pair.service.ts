import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CurrencyPairValueResDto } from './dto/currency-pair-value.res.dto';

@Injectable()
export class CurrencyPairService {

  constructor(
    private readonly _prisma: PrismaService,
  ) {
  }

  public async createPairs(data: Prisma.CurrencyPairCreateManyInput[]): Promise<Prisma.BatchPayload> {
    return this._prisma.currencyPair.createMany({ data });
  }

  public async getPairByName(name: string): Promise<CurrencyPairValueResDto> {
    return this._prisma.currencyPair.findFirst({
      where: { name, deleted: false },
      select: { name: true, value: true },
    });
  }

  public async getCountAllPairs(): Promise<number> {
    return this._prisma.currencyPair.count();
  }

  public async updatePairValue(name: string, value: number): Promise<void> {
    await this._prisma.currencyPair.update({ where: { name }, data: { value } });
  }

  public async getAllPairsNames(): Promise<string[]> {
    const pairs = await this._prisma.currencyPair.findMany({ select: { name: true } });
    return pairs.map(({ name }) => name);
  }

  public async softDelete(name: string): Promise<void> {
    this._prisma.currencyPair.update({
      where: { name },
      data: { deleted: true },
    });
  }

}
