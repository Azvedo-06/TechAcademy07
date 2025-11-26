import { Injectable, OnModuleInit } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { EventsService } from "./events.service";

@Injectable()
export class EventProcessorService implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly eventsService: EventsService,
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
        console.log(
          `[EventProcessor] EVENTO CRIADO | ID: ${event.id} | Título: "${event.title}" | SpaceId: ${spaceId} | UserId: ${userId}`,
        );
      } catch (err) {
        console.error('[EventProcessor] Erro ao processar mensagem:', err);
      }
    });
  }
}