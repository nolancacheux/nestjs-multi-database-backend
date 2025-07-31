import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

export const RedisProvider = [
  {
    provide: 'REDIS_CLIENT',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const client = createClient({
        url: `redis://${configService.get<string>('redis.host')}:${configService.get<number>('redis.port')}`,
      });

      client.on('error', (err) => console.error('Redis Client Error', err));

      await client.connect();
      return client;
    },
  },
];
