export class listaUsuarioDTO{
    constructor(
        readonly ID:string,
        readonly LOGIN:string,
        readonly EMAIL:string,

    ){}
}
export class listarUsuarioPessoaDTO{
    constructor(
        readonly ID:string,
        readonly LOGIN:string,
        readonly EMAIL:string,
        readonly IDPESSOA:string,
    ){}
}