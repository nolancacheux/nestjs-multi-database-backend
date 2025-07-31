import { Module } from '@nestjs/common';
import { StorageProvider } from './storage.provider';
import { StorageService } from '../../services/storage/file-storage.service';

@Module({
  providers: [
    ...StorageProvider,
    StorageService,
  ],
  exports: [
    ...StorageProvider,
    StorageService,
  ],
})
export class StorageModule {}
