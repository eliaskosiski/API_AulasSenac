import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PESSOA } from "./Pessoa.entity";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { PessoaService } from "./pessoa.service";
import { CriarPessoaDTO } from "./dto/inserirpessoa.dto";

 
 @Controller('/pessoa')
export class PessoaController{
    constructor(private readonly pessoaService: PessoaService){
             
    }

    @Get('listar')
    async listar(): Promise<PESSOA[]>{
        return this.pessoaService.listar();
    }

    @Post('')
    async criaPessoa(@Body() dados: CriarPessoaDTO): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.inserir(dados)        
    }

    @Put(':id')
    async alterarPessoa(@Body() dados: CriarPessoaDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<PESSOA>{
        return this.pessoaService.localizarID(id);
    }


    @Delete(':id')
    async removePessoa(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.pessoaService.remover(id);
    }
    
   
}