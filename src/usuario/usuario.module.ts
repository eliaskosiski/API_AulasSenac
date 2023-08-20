import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsuarioController } from "./usuario.controller";
import { usuarioProviders } from "./usuario.providers";
import { UsuarioService } from "./usuario.service";
import { pessoaProviders } from "src/pessoa/pessoa.providers";
import { PessoaService } from "src/pessoa/pessoa.service";

@Module ({
    imports: [DatabaseModule],
    controllers: [UsuarioController],
    providers: [
        ...usuarioProviders,
        UsuarioService,
        ...pessoaProviders,
        PessoaService
    ],
})

export class UsuarioModule {}