import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../../core/prisma/prisma.service';
import APP_CONFIG from '../../core/configs/app.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private readonly _prisma: PrismaService,
  ) {
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<UserEntity> {
    const password = await bcrypt.hash(data.password, APP_CONFIG.bcryptSalt);
    return this._prisma.user.create({ data: { ...data, password } });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return this._prisma.user.findFirst({ where: { email } });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return this._prisma.user.findFirst({ where: { id } });
  }

}
