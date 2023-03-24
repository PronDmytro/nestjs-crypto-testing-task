import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { Asset, Prisma } from '@prisma/client';

@Injectable()
export class AssetService {

  constructor(
    private readonly _prisma: PrismaService,
  ) {
  }

  public async createAsset(data: Prisma.AssetCreateInput): Promise<void> {
    await this._prisma.asset.create({ data });
  }

  public async changeAssetCountById(id: number, count: number): Promise<void> {
    await this._prisma.asset.update({ where: { id }, data: { count } });
  }

  public async changeAssetCostById(id: number, cost: number): Promise<void> {
    await this._prisma.asset.update({ where: { id }, data: { cost } });
  }

  public async getAllAssets(): Promise<Asset[]> {
    return this._prisma.asset.findMany();
  }

  public async removeAssetById(id: number): Promise<void> {
    await this._prisma.asset.delete({ where: { id } });
  }

}
