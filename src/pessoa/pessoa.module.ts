import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { PessoaController } from "./pessoa.controller";
import { pessoaProvider } from "./pessoa.providers";
import { PessoaService } from "./pessoa.service";

@Module ({
    imports: [DatabaseModule],
    controllers: [PessoaController],
    providers: [
        ...pessoaProvider,
        PessoaService,
    ],
})

export class PessoaModule {}