import { Injectable, OnModuleInit } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { EventsService } from "./events.service";
import { HttpService } from "src/http/http.service";

@Injectable()
export class EventProcessorService implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly eventsService: EventsService,
    private readonly httpService: HttpService,
  ) {}

  async onModuleInit() {
    const subscriber = this.redis.getSubscriber();

    await subscriber.subscribe('event_created');
    console.log('[EventProcessor] Inscrito no canal "event_created"');

    subscriber.on('message', async (channel, message) => {
      if (channel !== 'event_created') return;

      try {
        const data = JSON.parse(message);
        const { eventId, spaceId, userId } = data;

        if (!eventId || !spaceId || !userId) {
          console.warn('[EventProcessor] Mensagem inválida:', data);
          return;
        }

        // Busca evento no banco
        const event = await this.eventsService.findById(eventId);
        if (!event) {
          console.warn(`[EventProcessor] Evento ${eventId} não encontrado.`);
          return;
        }

        const space = await this.eventsService.getSpaceCache(spaceId);

        const user = await this.eventsService.getUserCache(userId);

        console.log(
          `[EventProcessor] Evento "${event.title}" | Espaço "${space.title}" | Usuário "${user.name}"`,
        );
      } catch (err) {
        console.error('[EventProcessor] Erro ao processar mensagem:', err);
      }
    });
  }
}