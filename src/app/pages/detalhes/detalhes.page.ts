import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  private _livro: Livro;

  constructor(
    private _livrosService: LivrosService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this._livro = this._livrosService.getLivro(params['id']);
    });
  }

  private editar() {
    this._router.navigate(['/editar'], { queryParams: { id: this._livro.getId() } });
  }

  ngOnInit() {
  }

}
