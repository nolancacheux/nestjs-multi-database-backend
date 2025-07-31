import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  storage: {
    endpoint: process.env.STORAGE_ENDPOINT,
    port: parseInt(process.env.STORAGE_PORT || '9000', 10),
    accessKey: process.env.STORAGE_ACCESS_KEY,
    secretKey: process.env.STORAGE_SECRET_KEY,
    bucket: process.env.STORAGE_BUCKET,
  },
});
