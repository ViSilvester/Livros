import { Injectable } from '@angular/core';
import { Livro } from '../classes/livro';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private livros: Array<Livro>
  private counter: number;

  constructor() {
    this.livros = new Array<Livro>();
    this.counter = 0;
    this.addLivro(new Livro(
      "Livro teste", "Eu", "Tal",
      5, null, "pt-br", 20)
    );
  }

  public addLivro(livro: Livro) {
    livro.setId(this.counter);
    this.livros.push(livro);
    this.counter++;

  }

  public getLivros() {
    return this.livros;
  }

  public getLivro(id: number): Livro {
    var r: Livro;
    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].getId() == id) {
        r = this.livros[i];
        break;
      }
    }
    return r;
  }

  public updateLivro(livro: Livro) {
    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].getId() == livro.getId()) {
        this.livros[i] = livro;
        break;
      }
    }
  }

  public deleteLivro(id: number) {
    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].getId() == id) {
        this.livros.splice(i, 1);
        break;
      }
    }
  }
}
