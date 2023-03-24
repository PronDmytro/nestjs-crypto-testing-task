import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegistrationReqDto } from './dto/registration.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { LoginReqDto } from './dto/login.req.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {
  }

  @Public()
  @Post('register')
  public async registerPerEmail(
    @Body() data: RegistrationReqDto,
  ): Promise<void> {
    if (data.password !== data.passwordConfirm) {
      throw new BadRequestException('Passwords do not match.');
    }

    if (!data.password.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      throw new BadRequestException('Password must be at least 8 characters long, contain A-z, 0-9.');
    }

    const { passwordConfirm, ...rest } = data;
    await this._userService.createUser(rest);
  }

  @Public()
  @Post('login')
  public async login(
    @Body() data: LoginReqDto,
  ): Promise<LoginResDto> {
    const { id, email } = await this._authService.validateUser(data);
    return { access_token: this._authService.generateJwtToken({ id, email }) };
  }

}
