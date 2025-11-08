import {
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
    // validar se o userId existe na API de usuários
    let user: any = await this.getUserCache(dto);
    // API de espaços
    const space = await this.getSpaceCache(dto.spaceId);
    this.validateEvent.FindSpace(space);

    this.validateEvent.validationIsAdm(user);
    const eventDate = this.validateEvent.validationDateEvent(dto.date);

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate },
    });

    this.validateEvent.validationExistEventDate(existingEvent);

    const event = this.repo.create({
      title: dto.title,
      date: new Date(dto.date),
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
        userId: dto.userId,
        spaceId: dto.spaceId
      }),
    );
    console.log('Published event_created event to Redis');

    return saved;
  }

  async findById(id: number) {
    console.log('Procurando Evento pelo id:', id);
    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.findEvent(event);
    return event;
  }

  async update(id: number, dto: UpdateEventDto) {
    // API de espaços
    const space = await this.getSpaceCache(dto.spaceId);
    this.validateEvent.FindSpace(space);

    const event = await this.repo.findOne({ where: { id } });
    this.validateEvent.FindSpace(space);
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
    event.spaceId = dto.spaceId ?? event.spaceId;
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


  private async getUserCache(dto: CreateEventDto) {
    const cacheKey = `user:${dto.userId}`;
    const cacheUser = await this.redis.getClient().get(cacheKey);

    if (cacheUser) {
      console.log('User data retrieved from cache');
      return JSON.parse(cacheUser);
    }

    const { data } = await this.http.users
      .get(`/users/${dto.userId}`)
      .catch(() => {
        throw new NotFoundException('Cache: Usuário não encontrado');
      });

    console.log('User data retrieved from users service, caching it now');
    await this.redis.getClient().set(cacheKey, JSON.stringify(data), 'EX', 60);

    return data;
  }

  private async getSpaceCache(spaceId: number) {
    const cacheKey = `space:${spaceId}`;
    const cacheSpace = await this.redis.getClient().get(cacheKey);

    if(cacheSpace) {
      console.log('Space data retrieved from cache');
      return JSON.parse(cacheSpace);
    }

    const { data } = await this.http.spaces
      .get(`/spaces/${spaceId}`)
      .catch(() => {
        throw new NotFoundException('Cache: Espaço não encontrado');
      });

    console.log('Space data retrieved from spaces service, caching it now');
    await this.redis.getClient().set(cacheKey, JSON.stringify(data), 'EX', 60);

    return data;
  }
}
