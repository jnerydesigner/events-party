import { PersonalDataEntity } from "@domain/entities/personal-data.entity";
import { PersonalDatarepository } from "@domain/repositories/personal-data.repository";
import { PrismaService } from "../prisma/prisma.service";
import { randomUUID } from "node:crypto";

export class PersonalDataPrismaRepository implements PersonalDatarepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPersonalData(personalData: PersonalDataEntity): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: {
        userId: personalData.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    try {
      const personalUserCreated = await this.prisma.personalData.create({
        data: {
          personalId: personalData.id,
          cep: personalData.cep,
          city: personalData.city,
          state: personalData.state,
          neighborhood: personalData.neighborhood,
          street: personalData.street,
          number: personalData.number,
          complement: personalData.complement,
          phone: personalData.phone,
          user: {
            connect: {
              userId: user.userId,
            },
          },
        },
      });

      return personalUserCreated;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  findPersonalDataByUserId(userId: string): Promise<PersonalDataEntity> {
    throw new Error("Method not implemented.");
  }
  updatePersonalData(personalData: PersonalDataEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
