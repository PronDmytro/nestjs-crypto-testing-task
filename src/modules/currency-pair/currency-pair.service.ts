import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CurrencyPairValueResDto } from './dto/currency-pair-value.res.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class CurrencyPairService {

  constructor(
    private readonly _prisma: PrismaService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {
  }

  public async createPairs(data: Prisma.CurrencyPairCreateManyInput[]): Promise<Prisma.BatchPayload> {
    return this._prisma.currencyPair.createMany({ data });
  }

  public async getPairByName(name: string): Promise<CurrencyPairValueResDto> {
    const value = +await this.redis.get(name);
    return { name, value };
  }

  public async getCountAllPairs(): Promise<number> {
    return this._prisma.currencyPair.count();
  }

  public async updatePairValue(name: string, value: number): Promise<void> {
    await this.redis.set(name, value);
  }

  public async getPairById(id: number) {
    return this._prisma.currencyPair.findFirst({
      where: { id },
      select: { name: true },
    });
  }

  public async getPairValueByName(name: string): Promise<number> {
    return +await this.redis.get(name);
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
