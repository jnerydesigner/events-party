import { UserEntity } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";

export class UserInMemoryRepository implements UserRepository {
  private users: UserEntity[] = [];
  constructor() {
    this.users = [];
  }
  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
