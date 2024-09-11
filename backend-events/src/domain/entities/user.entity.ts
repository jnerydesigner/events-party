import { randomUUID } from "node:crypto";
import * as bcrypt from "bcrypt";

export class UserEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const id = randomUUID();
    const passwordEncripted = await this.encryptPassword(password);
    return new UserEntity(id, name, email, passwordEncripted);
  }

  private static async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
