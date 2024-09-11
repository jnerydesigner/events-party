import { minioConfig } from "@infra/config/minio.config";
import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";
import { BufferedFile } from "@domain/models/file.model";
import * as crypto from "crypto";
import { promisify } from "util";

@Injectable()
export class MinioClientService {
  private readonly logger = new Logger(MinioClientService.name);
  private readonly baseBucket = minioConfig.MINIO_BUCKET;

  constructor(private readonly minio: MinioService) {}

  private get client() {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    if (!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))) {
      throw new HttpException("Invalid file type", HttpStatus.BAD_REQUEST);
    }

    const tempFilename = Date.now().toString();
    const hashedFileName = crypto
      .createHash("md5")
      .update(tempFilename)
      .digest("hex");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    const filename = `${hashedFileName}${ext}`;
    const fileBuffer = file.buffer;

    const metaData = {
      "Content-Type": file.mimetype,
      "X-Amz-Meta-Testing": 1234,
    };

    try {
      const putObject = promisify(this.client.putObject.bind(this.client));
      const responseFileUpload = await putObject(
        baseBucket,
        filename,
        fileBuffer,
        metaData,
      );
      this.logger.log(`File ${filename} uploaded successfully`);
      console.log(putObject);

      return {
        url: `http://${minioConfig.MINIO_ENDPOINT}:${minioConfig.MINIO_PORT}/${baseBucket}/${filename}`,
      };
    } catch (err) {
      this.logger.error(`Error uploading file: ${err.message}`, err.stack);
      throw new HttpException("Error uploading file", HttpStatus.BAD_REQUEST);
    }
  }
}
