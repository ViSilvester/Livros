import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private _livros: Array<Livro>;

  constructor(private _livroService: LivrosService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._livros = this._livroService.getLivros();
  }

  private _cadastrar() {
    this._router.navigate(["/cadastrar"]);
  }

  private _visualizar(livro: Livro) {
    this._router.navigate(["/detalhes"], { queryParams: { id: livro.getId() } })
  }

}
