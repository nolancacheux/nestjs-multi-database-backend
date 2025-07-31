import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';


import postgresConfig from './postgres.config';
import redisConfig from './redis.config';
import neo4jConfig from './neo4j.config';
import cassandraConfig from './cassandra.config';
import storageConfig from './storage.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        postgresConfig,
        redisConfig,
        neo4jConfig,
        cassandraConfig,
        storageConfig,
      ],
    }),
  ],
})
export class ConfigModule {}
