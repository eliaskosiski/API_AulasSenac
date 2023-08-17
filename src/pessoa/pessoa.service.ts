import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PESSOA } from "./pessoa.entity";

@Injectable()
export class PessoaService{
    constructor(
        @Inject('PESSOA_REPOSITORY')
        private pessoaRepository: Repository<PESSOA>,
    ){}

    async listar(): Promise<PESSOA[]> {
        return this.pessoaRepository.find();
      }
}