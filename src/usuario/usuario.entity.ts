import { PESSOA } from "src/pessoa/pessoa.entity";
import { Column, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

export class USUARIO{

    @PrimaryColumn()
    ID:string;

    @Column()
    LOGIN:string;

    @Column()
    SENHA:string;

    @Column()
    EMAIL:string;

    @OneToOne(() => PESSOA, pessoa => pessoa.ID)
    @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    IDPESSOA:PESSOA;

}