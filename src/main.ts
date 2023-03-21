import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import APP_CONFIG from './core/configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix(APP_CONFIG.apiPrefix);

  await app.listen(APP_CONFIG.port);
}

bootstrap();
