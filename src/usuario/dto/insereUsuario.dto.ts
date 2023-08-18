import { IsEmail, IsString } from "class-validator";
import { EmailUnico } from "src/validacao/email-unico.validator";

export class CriaUsuarioDTO{
    @IsString()
    LOGIN:string;

    @IsString()
    SENHA:string;

    @IsEmail(undefined,{message:'Email invalido'})
    @EmailUnico({message:'ja existe usuario com esse email'})
    EMAIL:string;

    @IsString()
    IDPESSOA:string;

}