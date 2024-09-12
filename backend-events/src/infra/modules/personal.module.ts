import { FileUploadService } from "@application/services/file-upload.service";
import { MinioClientService } from "@application/services/minio-client.service";
import { PersonalService } from "@application/services/personal.service";
import { PrismaService } from "@infra/database/mongo/prisma/prisma.service";
import { ImagesUserRepositoryPrisma } from "@infra/database/mongo/repositories/images-user-prisma.repository";
import { PersonalDataPrismaRepository } from "@infra/database/mongo/repositories/personal-data-prisma.repository";
import { CropImageHelper } from "@infra/helpers/image-crop.helper";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PersonalController } from "@presenters/personal.controller";

@Module({
  imports: [HttpModule],
  controllers: [PersonalController],
  providers: [
    PersonalService,
    CropImageHelper,
    {
      provide: "PERSONAL_REPOSITORY",
      useFactory: (prisma: PrismaService) => {
        return new PersonalDataPrismaRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: "IMAGES_REPOSITORY",
      useFactory: (prisma: PrismaService) => {
        return new ImagesUserRepositoryPrisma(prisma);
      },
      inject: [PrismaService],
    },
  ],
  exports: [PersonalService],
})
export class PersonalModule {}
