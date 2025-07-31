const { Client: MinioClient } = require('minio');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


async function storageUploadTest() {
  const storageClient = new MinioClient({
    endPoint: (process.env.STORAGE_ENDPOINT ?? '').replace('http://', ''),
    port: parseInt(process.env.STORAGE_PORT || '9000', 10),
    useSSL: false,
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
  });

  const bucket = process.env.STORAGE_BUCKET ?? 'uploads';
  // Création du bucket si inexistant
  await storageClient.makeBucket(bucket, '', (err: Error | null) => {
    if (err && (err as any).code !== 'BucketAlreadyOwnedByYou') {
      throw err;
    }
    console.log(`Bucket "${bucket}" ready.`);
  });
  const testFilePath = path.resolve(__dirname, './test-image.png');

  if (!fs.existsSync(testFilePath)) {
    throw new Error(`File not found: ${testFilePath}`);
  }

  const fileStream = fs.createReadStream(testFilePath);
  const fileStat = fs.statSync(testFilePath);

  if (!bucket) {
    throw new Error('Bucket name is not defined in environment variables.');
  }

  storageClient.putObject(bucket, 'test-image.png', fileStream, fileStat.size, (err: any, etag: any)  => {
    if (err) return console.log(err);
    console.log('File uploaded successfully!', etag);
  });
}

storageUploadTest();
