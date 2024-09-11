import { MinioClientService } from "@application/services/minio-client.service";
import { minioConfig } from "@infra/config/minio.config";
import { Module } from "@nestjs/common";
import { MinioModule } from "nestjs-minio-client";

@Module({
  imports: [
    MinioModule.register({
      endPoint: minioConfig.MINIO_ENDPOINT,
      port: minioConfig.MINIO_PORT,
      useSSL: false,
      accessKey: minioConfig.MINIO_ACCESSKEY,
      secretKey: minioConfig.MINIO_SECRETKEY,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
