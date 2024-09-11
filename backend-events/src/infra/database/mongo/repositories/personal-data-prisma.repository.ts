import { PersonalDataEntity } from "@domain/entities/personal-data.entity";
import { PersonalDatarepository } from "@domain/repositories/personal-data.repository";
import { PrismaService } from "../prisma/prisma.service";

export class PersonalDataPrismaRepository implements PersonalDatarepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPersonalData(personalData: any): Promise<void> {
    const user = await this.prisma.users.findFirst({
      where: {
        id: personalData.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.personalData.create({
      data: {
        user: {
          connect: {
            id: personalData.userId,
          },
        },
        cep: personalData.cep,
        city: personalData.city,
        state: personalData.state,
        neighborhood: personalData.neighborhood,
        street: personalData.street,
        number: personalData.number,
        complement: personalData.complement,
        phone: personalData.phone,
      },
    });
  }
  findPersonalDataByUserId(userId: string): Promise<PersonalDataEntity> {
    throw new Error("Method not implemented.");
  }
  updatePersonalData(personalData: PersonalDataEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
