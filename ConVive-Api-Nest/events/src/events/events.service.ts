import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './Event.model';
import { Repository, Not } from 'typeorm';
import { CreateEventDto } from './dto/createEventDto';
import { HttpService } from 'src/http/http.service';
import { RedisService } from 'src/redis/redis.service';
import { UpdateEventDto } from './dto/updateEventDto';
import { ValidationEvent } from 'src/utils/validationEvent';
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
    const user = await this.getUserCache(dto.userId);
    this.validateEvent.validationIsAdm(user);

    const space = await this.getSpaceCache(dto.spaceId);
    this.validateEvent.FindSpace(space);

    const eventDate = this.validateEvent.validationDateEvent(dto.date);

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate },
    });

    this.validateEvent.validationExistEventDate(existingEvent);

    const event = this.repo.create({
      title: dto.title,
      date: dto.date,
      spaceId: dto.spaceId,
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
        spaceId: saved.spaceId,
        userId: saved.userId,
      }),
    );
    console.log(`[Cache] Evento ${saved.title} criado e publicado no Redis`);

    return saved;
  }

  async findById(id: number) {
    console.log('Procurando Evento pelo id:', id);
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return event;
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    const space = await this.getSpaceCache(dto.spaceId);
    this.validateEvent.FindSpace(space);

    const eventDate = this.validateEvent.validationDateEvent(dto.date);

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate, id: Not(id) },
    });
    this.validateEvent.validationExistEventDate(existingEvent);

    Object.assign(event, dto);
    const updated = await this.repo.save(event);

    await this.redis.getPublisher().publish(
      'event_updated',
      JSON.stringify({
        eventId: updated.id,
        userId: updated.userId,
        spaceId: updated.spaceId,
      }),
    );
    console.log(`[Cache] Evento ${updated.title} atualizado e publicado no Redis`);
    return updated;
  }

  async delete(id: number) {
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return (this.repo.delete(id), { message: 'Evento deletado com sucesso' });
  }

  async getUserCache(userId: number) {
    const cacheKey = `user:${userId}`;

    const cacheUser = await this.redis.getClient().get(cacheKey);
    if (cacheUser) {
      console.log('User data retrieved from cache');
      return JSON.parse(cacheUser);
    }

    let userData: any;

    try {
      const response = await this.http.users.get(`/users/${userId}`);
      userData = response.data;
    } catch {
      userData = null;
    }

    if (userData) {
      console.log('User data retrieved from users service, caching it now');
      await this.redis
        .getClient()
        .set(`user:${userId}`, JSON.stringify(userData), 'EX', 3600);
      return userData;
    }

    // se não tiver encontrado na API
    throw new NotFoundException('Usuário não encontrado');
  }

  // -------------------------
  // CACHE INTELIGENTE DE ESPAÇO
  async getSpaceCache(spaceId: number) {
    const cacheKey = `space:${spaceId}`;

    const cacheSpace = await this.redis.getClient().get(cacheKey);
    if (cacheSpace) {
      console.log('Space data retrieved from cache');
      return JSON.parse(cacheSpace);
    }

    let spaceData: any;

    try {
      const response = await this.http.spaces.get(`/spaces/${spaceId}`);
      spaceData = response.data;
    } catch {
      spaceData = null;
    }

    if (spaceData) {
      await this.redis
        .getClient()
        .set(`space:${spaceId}`, JSON.stringify(spaceData), 'EX', 3600);
      return spaceData;
    }

    throw new NotFoundException('Espaço não encontrado');
  }
}
