import { DataSource } from 'typeorm';
import { PESSOA } from './pessoa.entity';

export const pessoaProvider = [
  {
    provide: 'PESSOA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PESSOA),
    inject: ['DATA_SOURCE'],
  },
];