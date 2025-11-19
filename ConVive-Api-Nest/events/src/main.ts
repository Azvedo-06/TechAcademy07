import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtAuthGuard } from './events/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  const config = new DocumentBuilder()
    .setTitle('Events Api')
    .setDescription('API responsável pelo gerenciamento de eventos')
    .setVersion('1.0')
    .addTag('Events')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('eventsUI', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));
  app.enableCors({origin: '*'} as CorsOptions)
  await app.listen(3000, '0.0.0.0');
}
bootstrap();