export class Livro {

    private id: number
    private titulo: string
    private autor: string
    private editora: string
    private edicao: number
    private imagem: string | ArrayBuffer
    private idioma: string
    private quantidade: number


    constructor(
        titulo: string,
        autor: string,
        editora: string,
        edicao: number,
        imagem: string | ArrayBuffer,
        idioma: string,
        quantidade: number
    ) {

        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.imagem = imagem;
        this.idioma = idioma;
        this.quantidade = quantidade;

    }

    public setId(id: number) {
        this.id = id;
    }
    public setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    public setAutor(autor: string) {
        this.autor = autor;
    }
    public setEditora(editora: string) {
        this.editora = editora;
    }
    public setEdicao(edicao: number) {
        this.edicao = edicao;
    }
    public setImagem(imagem: string | ArrayBuffer) {
        this.imagem = imagem;
    }
    public setIdioma(idioma: string) {
        this.idioma = idioma;
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
    public getAutor(): string {
        return this.autor;
    }
    public getEditora(): string {
        return this.editora;
    }
    public getEdicao(): number {
        return this.edicao;
    }
    public getImagem(): string | ArrayBuffer {
        return this.imagem;
    }
    public getIdioma(): string {
        return this.idioma;
    }
    public getQuantidade(): number {
        return this.quantidade;
    }
}
