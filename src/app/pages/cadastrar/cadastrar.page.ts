import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  private _formLivro: FormGroup;
  @ViewChild('imageInput') private _imageInput: ElementRef<HTMLInputElement>;
  private _urlDataImage: string | ArrayBuffer;
  private _fileImage: ArrayBuffer
  private _isLoading: boolean = false;

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
    private _storageService: StorageService,
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

  private get _photoSorce() {
    if (this._urlDataImage) {
      return 'local';
    }
    else {
      return 'none';
    }

  }

  private onFileChange(fileChangeEvent) {

    if (fileChangeEvent.target.files.length == 0) {
      return;
    }

    var file: File = fileChangeEvent.target.files[0]

    var r1 = new FileReader();
    r1.onload = (_event) => {
      this._urlDataImage = r1.result;
    }
    r1.readAsDataURL(file);

    var r2 = new FileReader();
    r2.onload = (_event) => {
      this._fileImage = r2.result as ArrayBuffer;
    }
    r2.readAsArrayBuffer(file);

  }

  private async _onSubmit() {


    this.validate("titulo");
    this.validate("autor");
    this.validate("editora");
    this.validate("edicao");
    this.validate("idioma");
    this.validate("quantidade");

    if (!this._formLivro.valid) {
      return;
    }

    this._isLoading = true;

    const titulo = this._formLivro.value['titulo'];
    const autor = this._formLivro.value['autor'];
    const editora = this._formLivro.value['editora'];
    const edicao = this._formLivro.value['edicao'];
    const idioma = this._formLivro.value['idioma'];
    const quantidade = this._formLivro.value['quantidade'];

    this._livroService.addLivro(
      new Livro(titulo, autor, editora, edicao, "", idioma, quantidade,)).then(
        result => {
          if (this._urlDataImage && result) {

            result.get().then(
              async val => {

                // livro recuperado
                var id = val.key
                var livro = val.val();

                // pega o link gerado da imagem

                var user = JSON.parse(localStorage.getItem('user'))
                const path = user.uid + "/" + id + "/image";
                await this._storageService.uploadImage(id, this._fileImage)
                var url = await this._storageService.getUrlFromPath(path)
                livro.setId

                // cria instancia de livro com dados atualizados

                livro = new Livro(livro.titulo,
                  livro.autor,
                  livro.editora,
                  livro.edicao,
                  url,
                  livro.idioma,
                  livro.quantidade);

                livro.setId(id)



                await this._livroService.updateLivro(livro).finally(
                  () => {
                    this._router.navigate(['']);
                  }
                )
              }
            )
          }
          else {
            this._router.navigate(['']);
          }


        }

      ).catch(
        error => {
          this._isLoading = false;
        }
      );


  }

}
