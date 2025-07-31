import { Client } from 'cassandra-driver';
import { ConfigService } from '@nestjs/config';

export const CassandraProvider = [
  {
    provide: 'CASSANDRA_CLIENT',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const client = new Client({
        contactPoints: configService.get<string[]>('cassandra.contactPoints') || ['localhost'],
        localDataCenter: configService.get('cassandra.localDataCenter') || 'datacenter1',
        protocolOptions: { port: configService.get<number>('cassandra.port') || 9042 },
      });

      await client.connect();
      return client;
    },
  },
];

