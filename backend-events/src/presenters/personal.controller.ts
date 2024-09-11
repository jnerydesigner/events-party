import { IPersonalDTO } from "@application/dto/personal.tdo";
import { PersonalService } from "@application/services/personal.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("personal")
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  async create(@Body() personal: IPersonalDTO) {
    return this.personalService.createPersonalData(personal);
  }
}
