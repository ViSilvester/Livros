import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  private _livro: Livro;
  private _etc: number;

  constructor(
    private _livrosService: LivrosService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._etc = 5;
    let id: number;
    this._activatedRoute.queryParams.subscribe(params => {
      this._livro = _livrosService.getLivro(params['id']);
    });
  }

  ngOnInit() {
  }

}
