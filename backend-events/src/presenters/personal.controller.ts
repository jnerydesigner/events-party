import { ImagesCreateDTO } from "@application/dto/images-create.dto";
import { IPersonalDTO } from "@application/dto/personal.tdo";
import { PersonalService } from "@application/services/personal.service";
import { BufferedFile } from "@domain/models/file.model";
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("personal")
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  async create(@Body() personal: IPersonalDTO) {
    return this.personalService.createPersonalData(personal);
  }

  @Post("image")
  @UseInterceptors(FileInterceptor("image"))
  async uploadSingle(
    @UploadedFile() image: BufferedFile,
    @Body() body: ImagesCreateDTO,
  ) {
    return await this.personalService.imageAvatarUpload(image, body.userId);
  }
}
