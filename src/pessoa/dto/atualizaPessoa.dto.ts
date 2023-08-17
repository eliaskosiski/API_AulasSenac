import { IsOptional, IsString } from "class-validator";

export class AlterarPessoaDTO{
    @IsString()
    @IsOptional()
    ENDERECO:string;

    @IsString()
    @IsOptional()
    TELEFONE:string;
}