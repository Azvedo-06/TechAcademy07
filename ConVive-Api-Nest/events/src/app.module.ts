import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
