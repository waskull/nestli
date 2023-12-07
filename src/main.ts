import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
//import {createResource} from './config/default-user';
import {ConfigService} from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger();
  const cS = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Documentation OpenAPI')
    .addBearerAuth()
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('NESTLI')
    .build();
    const port = 3000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  await app.listen(port);
  logger.log('Servidor corriendo en el puerto: '+port);
}
bootstrap();
