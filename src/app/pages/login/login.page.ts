import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {
    this.isLoading = false;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isLoading = false;
    this.email = null;
    this.senha = null;
  }

  email: string;
  senha: string;
  isLoading = false;


  private login() {

    if (this.email && this.senha) {

      this.isLoading = true;

      this._authService.login(this.email, this.senha)
        .catch(
          error => {
            console.log(error);
            this.isLoading = false;
          }

        )

    }
    else {
      console.log("Campos obrigatorios")
    }
  }

  loginGoogle() {
    this.isLoading = true;
    this._authService.loginWithGoogle().catch(
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  private _cadastrar() {
    if (!this.isLoading) {
      this._router.navigate(['sing-up']);
    }

  }

}
