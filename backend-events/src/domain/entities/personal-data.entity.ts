import { randomUUID } from "node:crypto";
import * as bcrypt from "bcrypt";

export class PersonalDataEntity {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly phone: string,
    readonly cep: string,
    readonly street: string,
    readonly number: string,
    readonly complement: string,
    readonly neighborhood: string,
    readonly city: string,
    readonly state: string,
  ) {}

  static create(
    userId: string,
    phone: string,
    cep: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
  ): PersonalDataEntity {
    const id = randomUUID();
    return new PersonalDataEntity(
      id,
      userId,
      phone,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    );
  }
}
