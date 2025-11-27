import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Spaces Api')
    .setDescription('API responsável pelo gerenciamento de Espaços')
    .setVersion('1.0')
    .addTag('Spaces')
    .build();
  const document  = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spacesUI', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));
  app.enableCors({origin: '*'} as CorsOptions)
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads',
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
