import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MarcaModule } from './marca/marca.module';
import { PessoaModule } from './pessoa/pessoa.module';


@Module({
  imports: [PessoaModule,MarcaModule,UsuarioModule,ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
