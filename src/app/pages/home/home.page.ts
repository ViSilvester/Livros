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

  constructor(private _livroService: LivrosService,
    private _router: Router,
    private _popoverController: PopoverController,
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
