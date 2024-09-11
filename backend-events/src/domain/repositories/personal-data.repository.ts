import { PersonalDataEntity } from "@domain/entities/personal-data.entity";

export interface PersonalDatarepository {
  createPersonalData(personalData: PersonalDataEntity): Promise<void>;
  findPersonalDataByUserId(userId: string): Promise<PersonalDataEntity>;
  updatePersonalData(personalData: PersonalDataEntity): Promise<void>;
}
