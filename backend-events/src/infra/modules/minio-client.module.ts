import { MinioClientService } from "@application/services/minio-client.service";
import { minioConfig } from "@infra/config/minio.config";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MinioModule } from "nestjs-minio-client";

@Global()
@Module({
  imports: [
    ConfigModule,
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        endPoint: minioConfig.MINIO_ENDPOINT,
        port: minioConfig.MINIO_PORT,
        useSSL: false,
        accessKey: minioConfig.MINIO_ACCESSKEY,
        secretKey: minioConfig.MINIO_SECRETKEY,
      }),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
