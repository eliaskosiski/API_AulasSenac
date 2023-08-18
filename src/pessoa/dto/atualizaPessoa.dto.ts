import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AlterarPessoaDTO{
    @IsString()
    @IsNotEmpty({message:'nome nao pode ser vazio!'})
    @IsOptional()
    NOME:string;
}