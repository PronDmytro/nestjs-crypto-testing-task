import { Controller, Get } from '@nestjs/common';
import { ValetService } from './valet.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ValetEntity } from './entity/valet.entity';

@ApiTags('Valet controller')
@ApiBearerAuth()
@Controller('valet')
export class ValetController {

  constructor(
    private readonly _valetService: ValetService,
  ) {
  }

  @Get()
  public async getUserValet(@CurrentUser() { id: userId }: UserEntity): Promise<ValetEntity> {
    const valet = await this._valetService.getValetByUserId(userId);
    return valet ? valet : (await this._valetService.createValetByUserId(userId));
  }

}
