import { User } from '@prisma/client';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserEntity implements User {

  public email: string;

  public id: number;

  public name: string;

  @ApiHideProperty()
  public password: string;

}
