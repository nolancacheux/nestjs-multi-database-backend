import { Module } from '@nestjs/common';
import { CassandraProvider } from './cassandra.provider';
import { MessageService } from '../../services/cassandra/message.service';
import { NotificationService } from '../../services/cassandra/notification.service';

@Module({
  providers: [
    ...CassandraProvider,
    MessageService,
    NotificationService,
  ],
  exports: [
    ...CassandraProvider,
    MessageService,
    NotificationService,
  ],
})
export class CassandraModule {}
