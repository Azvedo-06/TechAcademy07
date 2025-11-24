import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SpaceSubscriber implements OnModuleInit {
  constructor(private readonly redis: RedisService) {}

  async onModuleInit() {
    const subscriber = this.redis.getSubscriber();

    await subscriber.subscribe('space_created');
    console.log('[SpaceSubscriber] Inscrito no canal "space_created"');

    subscriber.on('message', async (channel, message) => {
      if (channel !== 'space_created') return;

      try {
        const space = JSON.parse(message);
        const cacheKey = `space:${space.id}`;
        await this.redis.getClient().set(cacheKey, JSON.stringify(space), 'EX', 3600);
        console.log(`[SpaceSubscriber] Espaço ${space.id} salvo no cache`);
      } catch (err) {
        console.error('[SpaceSubscriber] Erro ao processar mensagem:', err);
      }
    });
  }
}