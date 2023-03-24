import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login.req.dto';
import { IJwtPayload } from '../../shared/interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {
  }

  public async validateUser(data: LoginReqDto): Promise<UserEntity> {
    const user = await this._userService.getUserByEmail(data.email);

    if (!user) {
      throw new NotFoundException(`User by email: ${data.email} not found`);
    }

    if (!await bcrypt.compare(data.password, user.password)) {
      throw new UnauthorizedException(`Wrong password for user: ${data.email}`);
    }

    return user;
  }

  public generateJwtToken(payload: IJwtPayload): string {
    return this._jwtService.sign(payload);
  }

}
