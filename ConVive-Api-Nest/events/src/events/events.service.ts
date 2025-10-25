import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './Event.model';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/createEventDto';

@Injectable()
export class EventsService {
    constructor(@InjectRepository(Event) private repo: Repository<Event>) {}

    findAll() {
        return this.repo.find();
    }

    async create(dto: CreateEventDto) {
        const event = this.repo.create({title: dto.title, date: new Date(dto.date), location: dto.location, imageUrl: dto.imageUrl, descriptionCard: dto.descriptionCard, descriptionModal: dto.descriptionModal, userId: dto.userId});
        const saved = await this.repo.save(event);

        return saved;
    }

    async findById(id: number) {
        console.log('Procurando Evento pelo id:', id);
        const event = await this.repo.findOne({ where: { id } });

        if (!event) {
            throw new NotFoundException('Evento não encontrado');
        }
        return event;
    }
}
