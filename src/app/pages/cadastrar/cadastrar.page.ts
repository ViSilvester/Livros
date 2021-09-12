import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  private _formLivro: FormGroup;
  @ViewChild('imageInput') private _imageInput: ElementRef<HTMLInputElement>;

  constructor(
    private _formBuilder: FormBuilder,
    private _livroService: LivrosService,
    private _router: Router
  ) {
    this._formLivro = this._formBuilder.group({
      titulo: ['', Validators.required],
      autores: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: ['', Validators.required],
      premios: [''],
      quantidade: ['', Validators.required],
      imagem: [''],
    });
  }

  ngOnInit() {
  }

  private _validate() {

  }

  private submitImage() {
    this._imageInput.nativeElement.click();
  }

  private _onSubmit() {

    this._validate();

    if (!this._formLivro.valid) {
      return;
    }

    const titulo = this._formLivro.value['titulo'];
    const autores = this._formLivro.value['autores'];
    const editora = this._formLivro.value['editora'];
    const edicao = this._formLivro.value['edicao'];
    const premios = this._formLivro.value['premios'];
    const imagem = this._formLivro.value['imagem'];
    const quantidade = this._formLivro.value['quantidade'];

    this._livroService.addLivro(
      new Livro(titulo, autores, editora, edicao, imagem, premios, quantidade));

    this._router.navigate(['']);

  }

}
