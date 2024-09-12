import { ImagesUserEntity } from "@domain/entities/images-user.entity";

export interface ImagesUserRepository {
  save(imageUser: ImagesUserEntity): Promise<void>;
  findByUserId(userId: string): Promise<ImagesUserEntity>;
  update(imageUser: ImagesUserEntity): Promise<ImagesUserEntity>;
}
