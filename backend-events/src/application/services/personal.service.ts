import { IPersonalDTO } from "@application/dto/personal.tdo";
import { IViaCepResponseDTO } from "@application/dto/viacep-response.dto";
import { PersonalDataEntity } from "@domain/entities/personal-data.entity";
import { PersonalDatarepository } from "@domain/repositories/personal-data.repository";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PersonalService {
  constructor(
    @Inject("PERSONAL_REPOSITORY")
    private readonly personalRepository: PersonalDatarepository,
    private readonly httpService: HttpService,
  ) {}

  async createPersonalData(input: IPersonalDTO) {
    const { data: viaCepResponse } = await firstValueFrom(
      this.httpService.get<IViaCepResponseDTO>(
        `https://viacep.com.br/ws/${input.cep}/json`,
      ),
    );

    const personalData = PersonalDataEntity.create(
      input.userId,
      input.phone,
      input.cep,
      viaCepResponse.logradouro,
      input.number,
      input.complement,
      viaCepResponse.bairro,
      viaCepResponse.localidade,
      viaCepResponse.uf,
    );

    return this.personalRepository.createPersonalData(personalData);
  }
}
