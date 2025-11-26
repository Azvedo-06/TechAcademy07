import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    console.log(
      `[Cache] Evento ${updated.title} atualizado e publicado no Redis`,
    );
    return updated;
  }

  async delete(id: number) {
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return (this.repo.delete(id), { message: 'Evento deletado com sucesso' });
  }

  async getUserCache(userId: number) {
    userId = Number(userId);

    if (!userId || isNaN(userId) || userId < 1) {
      throw new NotFoundException(`ID de usuário inválido: ${userId}`);
    }

    const cacheKey = `user:${userId}`;
    const cacheUser = await this.redis.getClient().get(cacheKey);
    if (cacheUser) {
      console.log('User data retrieved from cache');
      return JSON.parse(cacheUser);
    }

    try {
      const response = await this.http.users.get(`/users/${userId}`);
      const userData = response.data;
      await this.redis
        .getClient()
        .set(cacheKey, JSON.stringify(userData), 'EX', 3600);

      return userData;
    } catch (err) {
      const status = err.response?.status;
      console.log('Erro ao buscar usuário na API:', status);

      if (status === 404) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (status === 401) {
        throw new UnauthorizedException('Não autorizado ao buscar usuário');
      }

      throw new Error('Erro ao buscar usuário na API');
    }
  }

  async getSpaceCache(spaceId: number) {
    spaceId = Number(spaceId);

    if (!spaceId || isNaN(spaceId) || spaceId < 1) {
      throw new NotFoundException(`ID de espaço inválido: ${spaceId}`);
    }

    const cacheKey = `space:${spaceId}`;
    console.log('id espaço: ', spaceId);

    const cacheSpace = await this.redis.getClient().get(cacheKey);
    if (cacheSpace) {
      console.log('Space data retrieved from cache');
      return JSON.parse(cacheSpace);
    }

    try {
      const response = await this.http.spaces.get(`/spaces/${spaceId}`);
      const spaceData = response.data;

      await this.redis
        .getClient()
        .set(cacheKey, JSON.stringify(spaceData), 'EX', 3600);

      return spaceData;
    } catch (err) {
      const status = err.response?.status;
      console.log('Erro ao buscar espaço na API:', err.response?.status);

      if (status === 401) {
        throw new UnauthorizedException('Não autorizado ao buscar espaço');
      }

      if (status === 404) {
        throw new NotFoundException('Espaço não encontrado');
      }

      throw new Error('Erro ao buscar espaço na API');
    }
  }
}
