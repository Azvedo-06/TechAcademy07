import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis, { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;
  private subscriber: Redis;

  constructor(cfg: ConfigService) {
    const host = cfg.get('REDIS_HOST', 'redis');
    const port = parseInt(cfg.get('REDIS_PORT', '6379'));

    this.client = new IORedis({ host, port });
    this.subscriber = new IORedis({ host, port });

    this.client.on('error', (err) => console.error('Redis client error:', err));
    this.subscriber.on('error', (err) =>
      console.error('Redis subscriber error:', err),
    );
  }

  async onModuleDestroy() {
    await this.client.quit();
    await this.subscriber.quit();
  }

  getClient() {
    return this.client;
  }

  getSubscriber() {
    return this.subscriber;
  }

  getPublisher() {
    return this.client; 
  }
}
