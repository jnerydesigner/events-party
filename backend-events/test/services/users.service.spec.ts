import { UserCreateDTO } from "@application/dto/user.dto";
import { UsersService } from "@application/services/users.service";
import { UserInMemoryRepository } from "@infra/database/in-memory/user-inmemory.repository";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

describe("UsersService", () => {
  let userService: UsersService;
  let userRepository: UserInMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: "USER_REPOSITORY", useClass: UserInMemoryRepository },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserInMemoryRepository>("USER_REPOSITORY");
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("should create a user", async () => {
    const userCreate: UserCreateDTO = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password: "123456",
    };

    const user = await userService.createUser(userCreate);

    expect(user.name).toBe("Jonh Doe");
    expect(user.email).toBe("jonh.doe@email.com");
    expect(userRepository["users"]).toHaveLength(1);
    expect(userRepository["users"][0].name).toBe("Jonh Doe");
  });

  it("should list user, and findEmail", async () => {
    const userCreate: UserCreateDTO = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password: "123456",
    };

    await userService.createUser(userCreate);
    const user = await userService.findMail(userCreate.email);
    const isValidpassword = await bcrypt.compare(
      userCreate.password,
      user.password,
    );

    expect(user.name).toBe("Jonh Doe");
    expect(user.email).toBe("jonh.doe@email.com");
    expect(isValidpassword).toBe(true);
  });

  it("should list users", async () => {
    const userCreateJohn: UserCreateDTO = {
      name: "Jonh Doe",
      email: "jonh.doe@email.com",
      password: "123456",
    };

    const userCreateJane: UserCreateDTO = {
      name: "Jane Doe",
      email: "jane.doe@email.com",
      password: "123456",
    };

    await userService.createUser(userCreateJohn);
    await userService.createUser(userCreateJane);

    const users = await userService.listUsers();

    expect(users).toHaveLength(2);
  });
});
