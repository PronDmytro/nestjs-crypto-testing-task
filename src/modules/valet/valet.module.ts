import { Module } from '@nestjs/common';
import { ValetController } from './valet.controller';
import { ValetService } from './valet.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    PrismaModule,
    AssetModule,
  ],
  controllers: [
    ValetController,
  ],
  providers: [
    ValetService,
  ],
})
export class ValetModule {
}
