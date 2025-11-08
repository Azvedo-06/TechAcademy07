import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { EventsService } from './events.service';
import { HttpService } from 'src/http/http.service';

@Injectable()
export class EventProcessorService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private readonly eventsService: EventsService,
    private readonly spaceService: HttpService,
  ) {}

  async onModuleInit() {
    const sub = this.redisService.getSubscriber2();

    await sub.subscribe('event_created', (err, count) => {
      if (err) {
        console.error('Falha ao se inscrever no canal Redis:', err);
      } else {
        console.log(`Inscrito no canal "event_created" (${count} canais ativos).`);
      }
    });

    sub.on('message', async (channel, message) => {
      console.log(`Mensagem recebida de ${channel}: ${message}`);

      try {
        const eventData = JSON.parse(message);
        const spaceId = eventData.spaces?.spaceId ?? eventData.spaceId ?? eventData.id;
        const eventId = eventData.eventId || eventData.id;

        const existing = await this.eventsService.findById(eventId);
        if (!existing) {
          console.warn(`Evento ${eventId} não encontrado.`);
          return;
        }
        const { data: space } = await this.spaceService.spaces.get(`/spaces/${spaceId}`);
        if (!space) {
          console.warn(`Espaço ${spaceId} não encontrado no serviço externo.`);
          return;
        }
        console.log(`Evento ${eventId} encontrado: "${existing.title}".`);
        console.log(`Espaço encontrado: "${space.title}" (ID: ${spaceId})`);
        console.log('Nenhuma ação adicional necessária.');

      } catch (err) {
        console.error('Erro ao processar mensagem do Redis:', err);
      }
    });
  }
}