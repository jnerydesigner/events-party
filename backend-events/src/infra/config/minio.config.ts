export const minioConfig = {
  MINIO_ENDPOINT: "localhost",
  MINIO_PORT: 9000,
  MINIO_ACCESSKEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRETKEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET_NAME,
};
