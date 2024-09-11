import { UsersService } from "@application/services/users.service";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.listUsers();
  }

  @Post()
  async create(@Body() user: any) {
    return this.usersService.createUser(user);
  }
}
