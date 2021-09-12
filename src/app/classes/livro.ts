export class Livro {

    private id: number
    private titulo: string
    private autores: Array<string>
    private editora: string
    private edicao: number
    private imagem: string
    private premios: Array<string>
    private quantidade: number


    constructor(
        titulo: string,
        autores: Array<string>,
        editora: string,
        edicao: number,
        imagem: string,
        premios: Array<string>,
        quantidade: number
    ) {

        this.titulo = titulo;
        this.autores = autores;
        this.editora = editora;
        this.edicao = edicao;
        this.imagem = imagem;
        this.premios = premios;
        this.quantidade = quantidade;

    }

    public setId(id: number) {
        this.id = id;
    }
    public setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    public setAutores(autores: Array<string>) {
        this.autores = autores;
    }
    public setEditora(editora: string) {
        this.editora = editora;
    }
    public setEdicao(edicao: number) {
        this.edicao = edicao;
    }
    public setImagem(imagem: string) {
        this.imagem = imagem;
    }
    public setPremios(premios: Array<string>) {
        this.premios = premios;
    }
    public setQuantidade(quantidade: number) {
        this.quantidade = quantidade;
    }

    public getId(): number {
        return this.id;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public getAutores(): Array<string> {
        return this.autores;
    }
    public getEditora(): string {
        return this.editora;
    }
    public getEdicao(): number {
        return this.edicao;
    }
    public getImagem(): string {
        return this.imagem;
    }
    public getPremios(): Array<string> {
        return this.premios;
    }
    public getQuantidade(): number {
        return this.quantidade;
    }
}
