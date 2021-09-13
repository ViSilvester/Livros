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
  photo: string | ArrayBuffer;
  private validationMessages = {
    titulo: "",
    autor: "",
    editora: "",
    edicao: "",
    idioma: "",
    quantidade: "",
    imagem: ""
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _livroService: LivrosService,
    private _router: Router,
  ) {
    this._formLivro = this._formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: ['', Validators.required],
      idioma: ['', Validators.required],
      quantidade: ['', Validators.required],
      imagem: [''],
    });
  }

  ngOnInit() {
  }

  private validate(key: string) {
    if (this._formLivro.get(key).invalid) {
      this.validationMessages[key] = "Campo obrigatorio";
    }
    else {
      this.validationMessages[key] = "";
    }
  }

  private submitImage() {
    this._imageInput.nativeElement.click();
  }

  private onFileChange(fileChangeEvent) {

    if (fileChangeEvent.target.files.length == 0) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(fileChangeEvent.target.files[0]);
    reader.onload = (_event) => {
      this.photo = reader.result;
    }

  }

  private _onSubmit() {

    this.validate("titulo");
    this.validate("autor");
    this.validate("editora");
    this.validate("edicao");
    this.validate("idioma");
    this.validate("quantidade");

    if (!this._formLivro.valid) {
      return;
    }

    const titulo = this._formLivro.value['titulo'];
    const autor = this._formLivro.value['autor'];
    const editora = this._formLivro.value['editora'];
    const edicao = this._formLivro.value['edicao'];
    const idioma = this._formLivro.value['idioma'];
    const quantidade = this._formLivro.value['quantidade'];

    this._livroService.addLivro(
      new Livro(titulo, autor, editora, edicao, this.photo, idioma, quantidade));

    this._router.navigate(['']);

  }

}
