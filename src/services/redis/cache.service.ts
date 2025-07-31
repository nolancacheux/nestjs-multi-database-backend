import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType) {}

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this.redisClient.setEx(key, expireSeconds, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
