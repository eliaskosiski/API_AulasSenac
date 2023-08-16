import { IsNotEmpty, IsString } from "class-validator";

export class CriarPessoaDTO{
    @IsString()
    @IsNotEmpty({message:"Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    
}