import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Users Api')
    .setDescription('API responsável pelo gerenciamento de Usuários')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document  = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('usersUI', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
