import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { CacheService } from '../../services/redis/cache.service';

@Module({
  providers: [
    ...RedisProvider,
    CacheService,
  ],
  exports: [
    ...RedisProvider,
    CacheService,
  ],
})
export class RedisModule {}
