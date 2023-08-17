import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class PESSOA{
    @PrimaryColumn()
    ID:string;

    @Column()
    NOME:string;

    @Column()
    ENDERECO:string;

    @Column()
    TELEFONE:string;

    // @OneToOne(USUARIO: usuario => usuario)
    // usuario: USUARIO;
}