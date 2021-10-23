import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone,
  ) {
    this._angularFireAuth.authState.subscribe(user => {
      if (user) {
        var userData = user;
        var oldUser = localStorage.getItem('user') == null ? false : true;
        localStorage.setItem('user', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('user'));
        if (_router.url == '/login' || _router.url == '/sing-up') {
          _router.navigate(['home']);
        }

      }
      else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        _router.navigate(['login']);
      }

    });

  }


  public login(email: string, senha: string) {
    return this._angularFireAuth.signInWithEmailAndPassword(email, senha);
  }

  public cadastrar(email: string, senha: string) {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, senha);
  }

  public loginWithGoogle() {
    return this._angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  public singOut() {
    this._angularFireAuth.signOut().catch(error => { console.log(error) });
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public canActivate(route: ActivatedRouteSnapshot) {

    var user = this.getUser();

    if (user) {
      if (route.url[0].path == "sing-up" || route.url[0].path == "login") {
        this._router.navigate(["home"]);
      }
      if (
        (route.url[0].path == "detalhes" ||
          route.url[0].path == "editar") &&
        !route.queryParams['id']) {

        this._router.navigate(["home"]);
      }
    }
    else {
      if (route.url[0].path != "sing-up" && route.url[0].path != "login") {
        this._router.navigate(["login"]);
      }
    }

    return true

  }



}
