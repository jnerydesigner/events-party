import { UserEntity } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";
import { PrismaService } from "../prisma/prisma.service";

export class UsersRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(user: UserEntity): Promise<UserEntity> {
    const usersCreated = await this.prisma.users.create({
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return new UserEntity(
      usersCreated.userId,
      usersCreated.name,
      usersCreated.email,
      usersCreated.password,
    );
  }
  async findByEmail(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<any[]> {
    return this.prisma.users.findMany({
      include: {
        PersonalData: true,
        ImagesUser: true,
      },
    });
  }
}
