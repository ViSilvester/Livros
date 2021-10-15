import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  email: string;
  senha: string;
  cSenha: string;
  isLoading = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  private _cadastrar() {
    if (this.email && this.senha && this.senha == this.cSenha) {
      this.isLoading = true;
      this._authService.cadastrar(this.email, this.senha).catch(
        error => {
          console.log(error);
          this.isLoading = false;
        }

      )
    }
  }

  ngOnInit() {
  }

}
