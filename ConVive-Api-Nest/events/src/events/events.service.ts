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

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private repo: Repository<Event>,
    private http: HttpService,
    private redis: RedisService,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async create(dto: CreateEventDto) {
    // Aqui você poderia validar se o userId existe na API de usuários
    let user: any = await this.http.instance
      .get(`/users/${dto.userId}`)
      .catch(() => {
        throw new NotFoundException('Usuário não encontrado');
      });

    if (!user.data.isAdmin) {
      throw new ForbiddenException('Usuário não pode criar um evento');
    }

    const eventDate = new Date(dto.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora horas

    if (eventDate < today) {
      throw new ForbiddenException('A data do evento não pode ser no passado');
    }

    const existingEvent = await this.repo.findOne({
      where: { date: eventDate },
    });

    if (existingEvent) {
      throw new BadRequestException('Já existe um evento nessa data.');
    }

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

  async findById(id: number) {
    console.log('Procurando Evento pelo id:', id);
    const event = await this.repo.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    return event;
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.repo.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (dto.date) {
      const eventDate = new Date(dto.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignora horas

      if (eventDate < today) {
        throw new ForbiddenException(
          'A data do evento não pode ser no passado',
        );
      }

      const existingEvent = await this.repo.findOne({
        where: { date: eventDate, id: Not(id) },
      });

      if (existingEvent) {
        throw new BadRequestException('Já existe um evento nessa data.');
      }

      event.date = eventDate;
    }

    event.title = dto.title ?? event.title;
    event.location = dto.location ?? event.location;
    event.imageUrl = dto.imageUrl ?? event.imageUrl;
    event.descriptionCard = dto.descriptionCard ?? event.descriptionCard;
    event.descriptionModal = dto.descriptionModal ?? event.descriptionModal;

    return await this.repo.save(event), { message: 'Evento atualizado com sucesso' };
  }

  async delete(id: number) {
    const event = await this.repo.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return this.repo.delete(id), { message: 'Evento deletado com sucesso' }
  }
}
