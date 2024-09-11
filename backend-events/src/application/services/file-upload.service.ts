import { Injectable } from "@nestjs/common";
import { MinioClientService } from "./minio-client.service";
import { BufferedFile } from "@domain/models/file.model";

@Injectable()
export class FileUploadService {
  constructor(private readonly minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    let uploadedImage = await this.minioClientService.upload(image);

    return {
      image_url: uploadedImage.url,
      message: "Successfully uploaded to MinIO S3",
    };
  }
}
