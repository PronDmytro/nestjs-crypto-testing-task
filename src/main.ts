import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import APP_CONFIG from './core/configs/app.config';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix(APP_CONFIG.apiPrefix);

  app.useLogger(app.get(Logger));

  const swaggerConfig = APP_CONFIG.swagger;
  if (swaggerConfig.enabled) {
    const documentConfig = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup(swaggerConfig.prefix, app, document, { swaggerOptions: { persistAuthorization: true } });
  }

  await app.listen(APP_CONFIG.port);
}

bootstrap();
