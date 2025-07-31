import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../models/postgres/user.entity';
import { Group } from '../../models/postgres/group.entity';

export const DatabaseProvider = [
  {
    provide: 'POSTGRES_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        entities: [User, Group],
        synchronize: true, // à mettre à false en production
      });
      return dataSource.initialize();
    },
  },
];
