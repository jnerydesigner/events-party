import { FileUploadService } from "@application/services/file-upload.service";
import { Module } from "@nestjs/common";
import { FileUploadController } from "@presenters/file-upload.controller";
import { MinioClientModule } from "./minio-client.module";

@Module({
  imports: [MinioClientModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
