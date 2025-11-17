import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './Event.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { HttpModule } from 'src/http/http.module';
import { RedisModule } from 'src/redis/redis.module';
import { HttpService } from 'src/http/http.service';
import { RedisService } from 'src/redis/redis.service';
import { EventProcessorService } from './event-processor.service';
import { EventApproverService } from './event-approver.service';
import { ValidationEvent } from 'src/utils/validationEvent';
import { JwtStrategy } from './guard/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), HttpModule, RedisModule, PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService, HttpService, RedisService, EventProcessorService, EventApproverService, ValidationEvent, JwtStrategy],
})
export class EventsModule {}
