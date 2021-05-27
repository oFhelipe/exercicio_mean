import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import Livro from '../Livro';
import { ActivatedRoute, ParamMap } from '@angular/router';
import LivroService from '../Livro.service';
import { mimeTypeValidator } from './mime-type.validator';
@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})
export class LivroInserirComponent implements OnInit {
  private modo: string = 'criar';
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  form: FormGroup;
  previewImagem: string;

  constructor(
    private livroService: LivroService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      autor: new FormControl(null, { validators: [Validators.required] }),
      paginas: new FormControl(null, {
        validators: [Validators.required],
      }),
      imagem: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeTypeValidator] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLivro')) {
        this.modo = 'editar';
        this.idLivro = paramMap.get('idLivro');
        this.estaCarregando = true;
        this.livroService.pegarLivros(this.idLivro).subscribe((dadosCli) => {
          this.estaCarregando = false;
          this.livro = {
            id: dadosCli._id,
            titulo: dadosCli.titulo,
            paginas: dadosCli.paginas,
            autor: dadosCli.autor,
            imagem:dadosCli.imagem
          };
          this.form.setValue({
            autor: this.livro.autor,
            paginas: this.livro.paginas,
            titulo: this.livro.titulo,
            imagem: this.livro.imagem
          });
        });
      } else {
        this.modo = 'criar';
        this.idLivro = null;
      }
    });
  }

  onImagemSelecionada(event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagem: arquivo });
    this.form.get('imagem').updateValueAndValidity();
    console.log(this.form);
    const reader = new FileReader();    
    reader.onload = () => { 
      this.previewImagem = reader.result as string;    
    }    
    reader.readAsDataURL(arquivo);
  }

  onClickSalvarLivro(form: NgForm) {
    if (this.form.invalid) {
      //se o form estiver inválido
      console.log('entrou')
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'criar') {
      const livro: Livro = {
        titulo: this.form.value.titulo,
        autor: this.form.value.autor,
        paginas: this.form.value.paginas,
        imagem: this.form.value.imagem
      };
      this.livroService.pushLivro(livro);
    } else {
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas,
        this.form.value.imagem
      );
    }
    this.form.reset();
  }
}
