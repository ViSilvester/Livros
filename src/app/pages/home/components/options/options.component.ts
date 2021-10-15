import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _popoverController: PopoverController,
  ) { }

  ngOnInit() { }

  private sair() {
    this._popoverController.dismiss();
    this._authService.singOut();
  }

}
