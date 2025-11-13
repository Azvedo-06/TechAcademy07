import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Events Api')
    .setDescription('API responsável pelo gerenciamento de eventos')
    .setVersion('1.0')
    .addTag('Events')
    .build();
  const document  = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('eventsUI', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));
  app.enableCors({origin: '*'} as CorsOptions)
  await app.listen(3000, '0.0.0.0');
}
bootstrap();