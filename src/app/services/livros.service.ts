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

  private getUserId() {
    var user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).uid;
    }
    return null;
  }

  public addLivro(livro: Livro) {

    return this._angularFireDatabase.list(this.path + "/" + this.getUserId()).push(livro)
  }

  public getLivros() {
    return this._angularFireDatabase.list<any>(this.path + "/" + this.getUserId()).snapshotChanges()
  }

  public getLivro(id: string) {


    return this._angularFireDatabase.list<any>(this.path + "/" + this.getUserId(), ref => ref.orderByKey()
      .equalTo(id))
      .snapshotChanges();


  }

  public updateLivro(livro: Livro) {
    return this._angularFireDatabase.list(this.path + "/" + this.getUserId()).update(livro.getId(), livro)
  }

  public deleteLivro(id: string) {
    return this._angularFireDatabase.list(this.path + "/" + this.getUserId()).remove(id);

  }
}
