import { Inject, Injectable } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import {v4 as uuid} from 'uuid';
import { Repository } from "typeorm";
import { CriarPessoaDTO } from "./dto/inserirpessoa.dto";
import { PESSOA } from "./pessoa.entity";
import { AlterarPessoaDTO } from "./dto/atualizaPessoa.dto";

@Injectable()
export class PessoaService{
    constructor(
        @Inject('PESSOA_REPOSITORY')
        private pessoaRepository: Repository<PESSOA>,
    ){}

    async listar(): Promise<PESSOA[]> {
        return this.pessoaRepository.find();
    }

    async inserir(dados: CriarPessoaDTO):Promise<RetornoCadastroDTO>{
        let pessoa = new PESSOA();
            pessoa.ID = uuid();
            pessoa.NOME = dados.NOME;
            pessoa.ENDERECO = dados.ENDERECO;
            pessoa.TELEFONE = dados.TELEFONE;

        return this.pessoaRepository.save(pessoa)
        .then((result) => {
            return <RetornoCadastroDTO>{
            id: pessoa.ID,
            message: "Pessoa cadastrada!"
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
            };
        })
    }

    async localizarID(ID: string): Promise<PESSOA> {
        return this.pessoaRepository.findOne({
          where: {
            ID,
          },
        });
      }

    async remover(id: string): Promise<RetornoObjDTO> {
        const pessoa = await this.localizarID(id);
        
        return this.pessoaRepository.remove(pessoa)
        .then((result) => {
          return <RetornoObjDTO>{
            return: pessoa,
            message: "Marca excluida!"
          };
        })
        .catch((error) => {
          return <RetornoObjDTO>{
            return: pessoa,
            message: "Houve um erro ao excluir." + error.message
          };
        });  
    }

    async alterar(id: string, dados: AlterarPessoaDTO): Promise<RetornoCadastroDTO> {
        const pessoa = await this.localizarID(id);
    
        Object.entries(dados).forEach(
          ([chave, valor]) => {
              if(chave=== 'id'){
                  return;
              }
    
              pessoa[chave] = valor;
          }
        )
    
        return this.pessoaRepository.save(pessoa)
        .then((result) => {
          return <RetornoCadastroDTO>{
            id: pessoa.ID,
            message: "Pessoa alterada!"
          };
        })
        .catch((error) => {
          return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao alterar." + error.message
          };
        });
    }

}