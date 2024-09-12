import { Injectable } from "@nestjs/common";
import { MinioClientService } from "./minio-client.service";
import { BufferedFile } from "@domain/models/file.model";
import { randomUUID } from "crypto";

@Injectable()
export class FileUploadService {
  constructor(private readonly minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    // const id = randomUUID();
    // let uploadedImage = await this.minioClientService.upload(id, image);
    // return {
    //   image_url: uploadedImage.url,
    //   message: "Successfully uploaded to MinIO S3",
    // };
  }
}
