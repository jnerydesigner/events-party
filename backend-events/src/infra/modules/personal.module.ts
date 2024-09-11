import { PersonalService } from "@application/services/personal.service";
import { PrismaService } from "@infra/database/mongo/prisma/prisma.service";
import { PersonalDataPrismaRepository } from "@infra/database/mongo/repositories/personal-data-prisma.repository";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PersonalController } from "@presenters/personal.controller";

@Module({
  imports: [HttpModule],
  controllers: [PersonalController],
  providers: [
    PersonalService,
    {
      provide: "PERSONAL_REPOSITORY",
      useFactory: (prisma: PrismaService) => {
        return new PersonalDataPrismaRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
  exports: [PersonalService],
})
export class PersonalModule {}
