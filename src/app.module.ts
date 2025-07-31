import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostgresModule } from './databases/postgres/postgres.module';
import { RedisModule } from './databases/redis/redis.module';
import { Neo4jModule } from './databases/neo4j/neo4j.module';
import { CassandraModule } from './databases/cassandra/cassandra.module';
import { StorageModule } from './databases/storage/storage.module';
import { UserController } from './controllers/user.controller';
import { MessageController } from './controllers/message.controller';
import { NotificationController } from './controllers/notification.controller';
import { GroupController } from './controllers/group.controller';
import { StorageController } from './controllers/storage.controller';

@Module({
  imports: [
    ConfigModule,
    PostgresModule,
    RedisModule,
    Neo4jModule,
    CassandraModule,
    StorageModule,
  ],
  controllers: [
    UserController,
    MessageController,
    NotificationController,
    GroupController,
    StorageController,
  ],
})
export class AppModule {}
