import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Event } from './events/Event.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { HttpService } from './http/http.service';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST'),
        port: parseInt(cfg.get('DB_PORT', '5432')),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASS'),
        database: cfg.get('DB_NAME'),
        entities: [Event],
        synchronize: true, // DEV only
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    RedisModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService, HttpService],
})
export class AppModule {}
