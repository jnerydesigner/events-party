import { IPersonalDTO } from "@application/dto/personal.tdo";
import { IViaCepResponseDTO } from "@application/dto/viacep-response.dto";
import { PersonalDataEntity } from "@domain/entities/personal-data.entity";
import { PersonalDatarepository } from "@domain/repositories/personal-data.repository";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { BufferedFile } from "@domain/models/file.model";
import { MinioClientService } from "./minio-client.service";
import { ImagesUserRepository } from "@domain/repositories/images-user.repository";
import { CropImageHelper } from "@infra/helpers/image-crop.helper";
import * as fs from "fs";
import { ImagesUserEntity } from "@domain/entities/images-user.entity";

@Injectable()
export class PersonalService {
  constructor(
    @Inject("PERSONAL_REPOSITORY")
    private readonly personalRepository: PersonalDatarepository,
    @Inject("IMAGES_REPOSITORY")
    private readonly imagesRepository: ImagesUserRepository,
    private readonly httpService: HttpService,
    private readonly uploadService: MinioClientService,
  ) {}

  async createPersonalData(input: IPersonalDTO) {
    const { data: viaCepResponse } = await firstValueFrom(
      this.httpService.get<IViaCepResponseDTO>(
        `https://viacep.com.br/ws/${input.cep}/json`,
      ),
    );

    const personalData = PersonalDataEntity.create(
      input.userId,
      input.phone,
      input.cep,
      viaCepResponse.logradouro,
      input.number,
      input.complement,
      viaCepResponse.bairro,
      viaCepResponse.localidade,
      viaCepResponse.uf,
    );

    return this.personalRepository.createPersonalData(personalData);
  }

  async imageAvatarUpload(image: BufferedFile, userId: string) {
    const imageUser = await this.imagesRepository.findByUserId(userId);
    const imageCropedHelper = await CropImageHelper.fromBuffer(
      image.buffer,
    ).cropToSquare();

    const imageCropedBuffer = await imageCropedHelper
      .resize(500, 500)
      .grayscale()
      .toBuffer();

    const imageRecroped = {
      buffer: imageCropedBuffer,
      ...image,
    };

    const { url } = await this.uploadService.uploadFileS3(
      userId,
      imageRecroped,
    );

    if (imageUser) {
      await this.uploadService.deleteImage(imageUser.url);
    }
    const imageEntity = new ImagesUserEntity(
      imageUser.id,
      imageUser.userId,
      url,
    );

    const imageSave = await this.imagesRepository.update(imageEntity);

    return imageSave;
  }
}
