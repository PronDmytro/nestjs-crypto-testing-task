import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {

  @ApiProperty()
  public access_token: string;

}
