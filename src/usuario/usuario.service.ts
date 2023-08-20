import { Inject, Injectable } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { PessoaService } from "src/pessoa/pessoa.service";
import { Repository } from "typeorm";
import { CriaUsuarioDTO } from "./dto/insereUsuario.dto";
import { USUARIO } from "./usuario.entity";
import {v4 as uuid} from 'uuid';
import { AlterarUsuarioDTO } from "./dto/atualizaUsuario.dto";
import { listarUsuarioPessoaDTO } from "./dto/listaUsuario.dto";

@Injectable()
export class UsuarioService {
  constructor(    
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,      
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,  
    private readonly pessoaService: PessoaService
  ) {}

  async listar(): Promise<USUARIO[]>{
    return this.usuarioRepository.find();
  }

  async validaEmail(EMAIL: string){
    const possivelUsuario = this.usuarioRepository.findOne({
        where:{
            EMAIL,
        } 
    });
    return (possivelUsuario !== null);
    }

    localizarID(ID: string): Promise<USUARIO> {
        return this.usuarioRepository.findOne({
          where: {
            ID,
          },
        });
    }

    async listarPessoa(): Promise<listarUsuarioPessoaDTO[]> {
      var resultado = await (this.usuarioRepository // select usuario.id as ID, usuario.login AS LOGIN, usuario.EMAIL AS EMAIL e from pessoa ......
        .createQueryBuilder('usuario')
        .select('usuario.ID', 'ID')
        .addSelect('usuario.LOGIN','LOGIN')
        .addSelect('usuario.EMAIL','EMAIL')
        .addSelect('PE.NOME','PESSOA')
        .leftJoin('pessoa', 'PE','usuario.idpessoa = PE.id')                     
        .getRawMany());  
  
      const listaRetorno = resultado.map(
        usuario => new listarUsuarioPessoaDTO(
          usuario.ID,
          usuario.LOGIN,
          usuario.EMAIL,
          usuario.PESSOA
        )
      );
  
      return listaRetorno;
    }

    async remover(id: string): Promise<RetornoObjDTO> {
        const produto = await this.localizarID(id);
        
        return this.usuarioRepository.remove(produto)
        .then((result) => {
          return <RetornoObjDTO>{
            return: produto,
            message: "Produto excluida!"
          };
        })
        .catch((error) => {
          return <RetornoObjDTO>{
            return: produto,
            message: "Houve um erro ao excluir." + error.message
          };
        });  
    }

    async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{
       
        let usuario = new USUARIO();
        usuario.ID = uuid();
        usuario.LOGIN = dados.LOGIN;       
        usuario.SENHA = dados.SENHA;
        usuario.EMAIL = dados.EMAIL; 
        usuario.IDPESSOA = await this.pessoaService.localizarID(dados.IDPESSOA);
        

        return this.usuarioRepository.save(usuario)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: usuario.ID,
            message: "Usuario cadastrado!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
    }

    async alterar(id: string, dados: AlterarUsuarioDTO): Promise<RetornoCadastroDTO> {
        const usuario = await this.localizarID(id);
    
        Object.entries(dados).forEach(
          async([chave, valor]) => {
              if(chave === 'ID'){
                  return;
              }
    
              if(chave === 'IDPESSOA'){
                usuario['PESSOA'] = await this.pessoaService.localizarID(valor);
                return;
               }
    
               usuario[chave] = valor;
          }
        )
    
        return this.usuarioRepository.save(usuario)
        .then((result) => {
          return <RetornoCadastroDTO>{
            id: usuario.ID,
            message: "usuario alterada!"
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