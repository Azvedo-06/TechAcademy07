import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEventDto';
import { UpdateEventDto } from './dto/updateEventDto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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

    @Delete('/:id')
    deleteEvent(@Param('id') id: number) {
        return this.eventService.delete(id);
    }

    @Put('/:id')
    updateEvent(@Param('id') id: number, @Body() dto:UpdateEventDto) {
        return this.eventService.update(id, dto);
    }

}
