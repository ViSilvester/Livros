import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Livro } from 'src/app/classes/livro';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  private _livro: Livro;
  private _formLivro: FormGroup;
  private photo: string | ArrayBuffer;
  private validationMessages = {
    titulo: "",
    autor: "",
    editora: "",
    edicao: "",
    idioma: "",
    quantidade: "",
    imagem: ""
  }

  @ViewChild('imageInput') private _imageInput: ElementRef<HTMLInputElement>;

  constructor(
    private _formBuilder: FormBuilder,
    private _livrosService: LivrosService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _navControler: NavController,
    private _AlertController: AlertController,
  ) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._livrosService.getLivro(params['id']).subscribe(
        res => {
          if (res.length > 0) {
            var livro = res[0].payload.val();
            this._livro = new Livro(
              livro.titulo,
              livro.autor,
              livro.editora,
              livro.edicao,
              livro.imgUrl,
              livro.idioma,
              livro.quantidade,
            );
            this._livro.setId(res[0].key);
            this.createForm();
          }
        }
      );
    });

  }

  ngOnInit() {

  }

  private createForm() {
    this._formLivro = this._formBuilder.group({
      titulo: [this._livro.getTitulo(), Validators.required],
      autor: [this._livro.getAutor(), Validators.required],
      editora: [this._livro.getEditora(), Validators.required],
      edicao: [this._livro.getEdicao(), Validators.required],
      idioma: [this._livro.getIdioma(), Validators.required],
      quantidade: [this._livro.getQuantidade(), Validators.required],
      imagem: [""],
    });

    this.photo = this._livro.getImgUrl();

  }

  private submitImage() {
    this._imageInput.nativeElement.click();
  }

  private validate(key: string) {
    if (this._formLivro.get(key).invalid) {
      this.validationMessages[key] = "Campo obrigatorio";
    }
    else {
      this.validationMessages[key] = "";
    }
  }

  private async deleteLivro() {

    let alert = await this._AlertController.create({
      header: "Excluir livro",
      message: "Você realmente deseja excluir esse livro?",
      buttons: [{
        text: "Excluir",
        handler: () => { this.onDelete() }
      },
      {
        text: "Cancelar",
        role: "cancel",
      }]
    });

    alert.present()

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

  private onDelete() {

    this._livrosService.deleteLivro(this._livro.getId());
    this._router.navigate(['']);

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

    this._livro.setTitulo(titulo);
    this._livro.setAutor(autor);
    this._livro.setEditora(editora);
    this._livro.setEdicao(edicao);
    this._livro.setIdioma(idioma);
    this._livro.setImgUrl("");
    this._livro.setQuantidade(quantidade);

    this._livrosService.updateLivro(this._livro);

    this._navControler.back();

  }

}
