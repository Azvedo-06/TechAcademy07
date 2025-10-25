import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEventDto';

@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) {}

    @Get()
    getAllEvents() {
        return this.eventService.findAll();
    }

    @Get('/:id')
    getEventById(@Param('id') id: number) {
        return this.eventService.findById(id);
    }

    @Post()
    createEvent(@Body() dto: CreateEventDto) {
        return this.eventService.create(dto);
    }

}
