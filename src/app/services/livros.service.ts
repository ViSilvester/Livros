import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Livro } from '../classes/livro';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  path = '/livros';

  constructor(private _angularFireDatabase: AngularFireDatabase) {
  }

  public addLivro(livro: Livro) {
    this._angularFireDatabase.list(this.path).push(livro).catch(
      error => {
        console.log(error)
      }
    )
  }

  public getLivros(): Array<Livro> {

    var result = []

    this._angularFireDatabase.list<any>(this.path).snapshotChanges().subscribe(
      res => {
        while (result.length > 0) {
          result.pop();
        }
        if (res.length > 0) {
          res.forEach(data => {
            var x = data.payload.val();
            var l = new Livro(
              x.titulo,
              x.autor,
              x.editora,
              x.edicao,
              x.imgUrl,
              x.idioma,
              x.quantidade);

            l.setId(data.key);

            result.push(l);
          }
          )
        }
      }
    );

    return result;
  }

  public getLivro(id: string) {


    return this._angularFireDatabase.list<any>(this.path, ref => ref.orderByKey()
      .equalTo(id))
      .snapshotChanges();


  }

  public updateLivro(livro: Livro) {
    this._angularFireDatabase.list(this.path).update(livro.getId(), livro)
  }

  public deleteLivro(id: string) {
    this._angularFireDatabase.list(this.path).remove(id);

  }
}
