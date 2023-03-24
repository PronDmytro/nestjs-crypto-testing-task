import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import APP_CONFIG from '../../../core/configs/app.config';
import { IJwtPayload } from '../../../shared/interfaces/jwt-payload.interface';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.jwt.secret,
    });
  }

  public async validate(payload: IJwtPayload): Promise<UserEntity> {
    return await this._userService.getUserById(payload.id);
  }

}
