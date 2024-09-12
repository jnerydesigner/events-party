import { ImagesUserRepository } from "@domain/repositories/images-user.repository";
import { PrismaService } from "../prisma/prisma.service";
import { ImagesUserEntity } from "@domain/entities/images-user.entity";

export class ImagesUserRepositoryPrisma implements ImagesUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: string): Promise<ImagesUserEntity> {
    const image = await this.prismaService.imagesUser.findFirst({
      where: {
        userId,
      },
    });

    const imageEntity = new ImagesUserEntity(
      image.imageId,
      image.userId,
      image.url,
    );

    return imageEntity;
  }
  async save(image: ImagesUserEntity): Promise<void> {
    await this.prismaService.imagesUser.create({
      data: {
        imageId: image.id,
        url: image.url,
        userId: image.userId,
      },
    });
  }

  async update(imageUser: ImagesUserEntity): Promise<ImagesUserEntity> {
    const updateuser = await this.prismaService.imagesUser.update({
      where: {
        imageId: imageUser.id,
      },
      data: {
        url: imageUser.url,
      },
    });

    const imageEntity = new ImagesUserEntity(
      updateuser.imageId,
      updateuser.userId,
      updateuser.url,
    );

    return imageEntity;
  }
}
