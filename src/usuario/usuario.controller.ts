import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { AlterarUsuarioDTO } from "./dto/atualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/insereUsuario.dto";
import { USUARIO } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

 
 @Controller('/usuario')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){
             
    }

    @Get('listar')
    async listar(): Promise<USUARIO[]>{
        return this.usuarioService.listar();
    }

    @Post('')
    async criaPessoa(@Body() dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.inserir(dados)        
    }

    @Put(':id')
    async alterarPessoa(@Body() dados: AlterarUsuarioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.alterar(id,dados)        
    }
    
    @Get(':id')
    async listarID(@Param('id') id: string): Promise<USUARIO>{
        return this.usuarioService.localizarID(id);
    }


    @Delete(':id')
    async removePessoa(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.usuarioService.remover(id);
    }
    
   
}