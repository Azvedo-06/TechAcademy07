import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './Event.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { HttpModule } from 'src/http/http.module';
import { RedisModule } from 'src/redis/redis.module';
import { HttpService } from 'src/http/http.service';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), HttpModule, RedisModule],
  controllers: [EventsController],
  providers: [EventsService, HttpService, RedisService],
})
export class EventsModule {}
