import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserSubscriber implements OnModuleInit {
  constructor(private readonly redis: RedisService) {}

  async onModuleInit() {
    const subscriber = this.redis.getSubscriber();

    await subscriber.subscribe('user_created');
    console.log('[UserSubscriber] Inscrito no canal "user_created"');

    subscriber.on('message', async (channel, message) => {
      if (channel !== 'user_created') return;

      try {
        const user = JSON.parse(message);
        const cacheKey = `user:${user.id}`;
        await this.redis.getClient().set(cacheKey, JSON.stringify(user), 'EX', 3600);
        console.log(`[UserSubscriber] Usuário ${user.id} salvo no cache`);
      } catch (err) {
        console.error('[UserSubscriber] Erro ao processar mensagem:', err);
      }
    });
  }
}