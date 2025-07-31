import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

export const StorageProvider = [
  {
    provide: 'STORAGE_CLIENT',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const minioClient = new Client({
        endPoint: configService.get<string>('storage.endpoint') || 'default-endpoint',
        port: configService.get<number>('storage.port'),
        useSSL: false,
        accessKey: configService.get<string>('storage.accessKey'),
        secretKey: configService.get<string>('storage.secretKey'),
      });

      return minioClient;
    },
  },
];
