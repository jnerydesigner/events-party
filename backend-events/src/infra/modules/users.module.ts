import { UsersService } from "@application/services/users.service";
import { PrismaService } from "@infra/database/mongo/prisma/prisma.service";
import { UsersRepositoryPrisma } from "@infra/database/mongo/repositories/users-prisma.repository";
import { Module } from "@nestjs/common";
import { UsersController } from "@presenters/users.controller";

@Module({
  providers: [
    UsersService,
    {
      provide: "USER_REPOSITORY",
      useFactory: (prisma: PrismaService) => {
        return new UsersRepositoryPrisma(prisma);
      },
      inject: [PrismaService],
    },
  ],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
