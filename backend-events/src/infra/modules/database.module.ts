import { PrismaService } from "@infra/database/mongo/prisma/prisma.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
