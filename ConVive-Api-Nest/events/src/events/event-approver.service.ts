import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { EventsService } from './events.service';

@Injectable()
export class EventApproverService implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly eventsService: EventsService,
  ) {}

  async onModuleInit() {
    const subscriber = this.redis.getSubscriber();

    await subscriber.subscribe('event_processed');
    console.log('[EventApprover] Inscrito no canal "event_processed"');

    subscriber.on('message', async (channel, message) => {
      if (channel !== 'event_processed') return;

      try {
        const data = JSON.parse(message);
        const { eventId, spaceId, userId } = data;

        if (!eventId || !spaceId || !userId) {
          console.warn('[EventApprover] Mensagem inválida:', data);
          return;
        }

        const event = await this.eventsService.findById(eventId);
        if (!event) {
          console.warn(`[EventApprover] Evento ${eventId} não encontrado.`);
          return;
        }

        console.log(
          `[EventApprover] EVENTO PROCESSADO | ID: ${event.id} | Título: "${event.title}" | SpaceId: ${spaceId} | UserId: ${userId}`,
        );
      } catch (err) {
        console.error('[EventApprover] Erro ao processar mensagem:', err);
      }
    });
  }
}