import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Livro from '../Livro';
import { ActivatedRoute, ParamMap } from '@angular/router';
import LivroService from '../Livro.service';
@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})
export class LivroInserirComponent implements OnInit {
  private modo: string = 'criar';
  private idLivro: string;
  public livro: Livro;

  constructor(
    private livroService: LivroService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLivro')) {
        this.modo = 'editar';
        this.idLivro = paramMap.get('idLivro');
        this.livroService.pegarLivros(this.idLivro).subscribe((dadosCli) => {
          this.livro = {
            id: dadosCli._id,
            titulo: dadosCli.titulo,
            paginas: dadosCli.paginas,
            autor: dadosCli.autor,
          };
        });
      } else {
        this.modo = 'criar';
        this.idLivro = null;
      }
    });
  }

  onClickSalvarLivro(form: NgForm) {
    if (form.invalid) {
      //se o form estiver inválido
      return;
    }
    if (this.modo === 'criar') {
      const livro: Livro = {
        titulo: form.value.titulo,
        autor: form.value.autor,
        paginas: form.value.paginas,
      };
      this.livroService.pushLivro(livro);
    } else {
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.paginas
      );
    }
    form.resetForm();
  }
}
