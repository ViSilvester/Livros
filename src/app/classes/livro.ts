export class Livro {

    private id: string
    private titulo: string
    private autor: string
    private editora: string
    private edicao: number
    private imgUrl: string
    private idioma: string
    private quantidade: number


    constructor(
        titulo: string,
        autor: string,
        editora: string,
        edicao: number,
        imgUrl: string,
        idioma: string,
        quantidade: number
    ) {

        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.imgUrl = imgUrl;
        this.idioma = idioma;
        this.quantidade = quantidade;

    }

    public setId(id: string) {
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
    public setImgUrl(imgUrl: string) {
        this.imgUrl = imgUrl;
    }
    public setIdioma(idioma: string) {
        this.idioma = idioma;
    }
    public setQuantidade(quantidade: number) {
        this.quantidade = quantidade;
    }

    public getId(): string {
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

    public getImgUrl(): string {
        return this.imgUrl;
    }
    public getIdioma(): string {
        return this.idioma;
    }
    public getQuantidade(): number {
        return this.quantidade;
    }
}
