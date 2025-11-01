import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './Event.model';
import { Repository, Not } from 'typeorm';
import { CreateEventDto } from './dto/createEventDto';
import { HttpService } from 'src/http/http.service';
import { RedisService } from 'src/redis/redis.service';
import { UpdateEventDto } from './dto/updateEventDto';
import { ValidationEvent } from 'src/utils/validationEvent';
import e from 'express';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private repo: Repository<Event>,
    private http: HttpService,
    private redis: RedisService,
    private validateEvent: ValidationEvent,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async create(dto: CreateEventDto) {
    //validar se o userId existe na API de usuários
    let user: any = await this.getUserCache(dto);

    this.validateEvent.validationIsAdm(user);
    const eventDate = this.validateEvent.validationDateEvent(dto.date);

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate },
    });

    this.validateEvent.validationExistEventDate(existingEvent);

    const event = this.repo.create({
      title: dto.title,
      date: new Date(dto.date),
      location: dto.location,
      imageUrl: dto.imageUrl,
      descriptionCard: dto.descriptionCard,
      descriptionModal: dto.descriptionModal,
      userId: dto.userId,
    });
    const saved = await this.repo.save(event);

    await this.redis.getPublisher().publish(
      'event_created',
      JSON.stringify({
        eventId: saved.id,
        userId: dto.userId,
      }),
    );
    console.log('Published event_created event to Redis');

    return saved;
  }

  private async getUserCache(dto: CreateEventDto) {
    const cacheKey = `user:${dto.userId}`;
    const cacheUser = await this.redis.getClient().get(cacheKey);

    if (cacheUser) {
      console.log('User data retrieved from cache');
      return JSON.parse(cacheUser);
    }

    const { data } = await this.http.instance
      .get(`/users/${dto.userId}`)
      .catch(() => {
        throw new NotFoundException('Usuário não encontrado');
      });

    console.log('User data retrieved from users service, caching it now');
    await this.redis.getClient().set(cacheKey, JSON.stringify(data), 'EX', 60);

    return data;
  }

  async findById(id: number) {
    console.log('Procurando Evento pelo id:', id);
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return event;
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.repo.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    const eventDate = this.validateEvent.validationDateEvent(dto.date);

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate, id: Not(id) },
    });

    this.validateEvent.validationExistEventDate(existingEvent);

    event.date = eventDate;
    event.title = dto.title ?? event.title;
    event.location = dto.location ?? event.location;
    event.imageUrl = dto.imageUrl ?? event.imageUrl;
    event.descriptionCard = dto.descriptionCard ?? event.descriptionCard;
    event.descriptionModal = dto.descriptionModal ?? event.descriptionModal;

    return (
      await this.repo.save(event),
      { message: 'Evento atualizado com sucesso' }
    );
  }

  async delete(id: number) {
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return (this.repo.delete(id), { message: 'Evento deletado com sucesso' });
  }
}
