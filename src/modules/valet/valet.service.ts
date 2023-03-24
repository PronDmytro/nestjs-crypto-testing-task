import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { ValetEntity } from './entity/valet.entity';

@Injectable()
export class ValetService {

  constructor(
    private readonly _prisma: PrismaService,
  ) {
  }

  public async createValetByUserId(userId: number): Promise<ValetEntity> {
    await this._prisma.valet.create({ data: { user: { connect: { id: userId } } } });
    return await this.getValetByUserId(userId);
  }

  public async getValetByUserId(userId: number): Promise<ValetEntity> {
    return this._prisma.valet.findFirst({
      where: { userId },
      select: {
        id: true,
        assets: {
          select: {
            count: true,
            cost: true,
            pair: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

}
