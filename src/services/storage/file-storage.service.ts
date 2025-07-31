import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'minio';
import { Multer } from 'multer'; 

@Injectable()
export class StorageService {
  private readonly bucket: string;

  constructor(@Inject('STORAGE_CLIENT') private storageClient: Client) {
    this.bucket = process.env.STORAGE_BUCKET || 'default-bucket-name'; // Replace 'default-bucket-name' with an appropriate fallback value
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    await this.storageClient.putObject(this.bucket, file.originalname, file.buffer);
    const url = await this.storageClient.presignedGetObject(this.bucket, file.originalname);
    return { url };
  }

  async downloadFile(filename: string) {
    return await this.storageClient.getObject(this.bucket, filename);
  }
}
