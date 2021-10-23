import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _angularFireStorage: AngularFireStorage) {
  }

  public uploadImage(livroId: string, data: any,) {
    var user = JSON.parse(localStorage.getItem('user'))
    const path = user.uid + "/" + livroId + "/image"
    return this._angularFireStorage.upload(path, data);
  }

  public getUrlFromPath(path) {
    return this._angularFireStorage.ref(path).getDownloadURL().toPromise()
  }
}
