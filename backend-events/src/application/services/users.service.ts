import { UserCreateDTO } from "@application/dto/user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_REPOSITORY")
    private readonly userRepository: UserRepository,
  ) {}
  async createUser(user: UserCreateDTO) {
    const createUser = await UserEntity.create(
      user.name,
      user.email,
      user.password,
    );
    return this.userRepository.save(createUser);
  }

  async findMail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async listUsers() {
    return this.userRepository.findAll();
  }
}
