import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Livro } from 'src/app/classes/livro';
import { AuthService } from 'src/app/services/auth.service';
import { LivrosService } from 'src/app/services/livros.service';
import { OptionsComponent } from './components/options/options.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private _livros: Array<Livro>;
  private _isLoading: boolean = true;

  constructor(private _livroService: LivrosService,
    private _router: Router,
    private _popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
    this._loadLivros();
  }

  ionViewWillEnter() {
    this._loadLivros()
  }

  private _loadLivros() {
    this._isLoading = true;
    this._livroService.getLivros().subscribe(
      res => {

        this._livros = [];
        res.forEach(e => {

          var livro = new Livro(
            e.payload.val().titulo,
            e.payload.val().autor,
            e.payload.val().editora,
            e.payload.val().edicao,
            e.payload.val().imgUrl,
            e.payload.val().idioma,
            e.payload.val().quantidade);

          livro.setId(e.key);

          this._livros.push(livro
          );

        })
        this._isLoading = false;
      }
    )

  }

  private _cadastrar() {
    this._router.navigate(["/cadastrar"]);
  }

  private _visualizar(livro: Livro) {
    this._router.navigate(["/detalhes"], { queryParams: { id: livro.getId() } })
  }

  async presentPopover(ev: any) {
    const popover = await this._popoverController.create({
      component: OptionsComponent,
      cssClass: 'popover',
      event: ev,
      translucent: true

    });
    await popover.present();
  }



}
