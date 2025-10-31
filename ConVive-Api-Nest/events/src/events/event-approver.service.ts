import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { EventsService } from './events.service';

@Injectable()
export class EventApproverService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private readonly eventsService: EventsService,
  ) {}

  async onModuleInit() {
    const sub = this.redisService.getSubscriber2();

    await sub.subscribe('event_processed', (err, count) => {
      if (err) {
        console.error('Falha ao se inscrever no canal Redis:', err);
      } else {
        console.log(`Inscrito com sucesso! (${count} canais ativos)`);
      }
    });

    sub.on('message', async (channel, message) => {
      console.log(`Mensagem recebida de ${channel}: ${message}`);

      try {
        const event = JSON.parse(message);
        const eventId = event.eventId;

        const existing = await this.eventsService.findById(eventId);

        if (!existing) {
          console.warn(`Evento ${eventId} não encontrado.`);
          return;
        }

        console.log(`Evento ${eventId} encontrado:`, existing.title);
        console.log('Nenhuma ação necessária (sem regra de negócio definida).');
      } catch (err) {
        console.error(' Erro ao processar mensagem:', err);
      }
    });
  }
}
