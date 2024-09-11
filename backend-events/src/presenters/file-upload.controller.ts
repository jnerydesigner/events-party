import { FileUploadService } from "@application/services/file-upload.service";
import { BufferedFile } from "@domain/models/file.model";
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("file-upload")
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post("single")
  @UseInterceptors(FileInterceptor("image"))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadSingle(image);
  }
}
