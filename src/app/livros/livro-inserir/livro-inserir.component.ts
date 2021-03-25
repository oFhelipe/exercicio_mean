import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Livro from '../Livro';
import LivroService from '../Livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})
export class LivroInserirComponent {

  constructor(private livroService: LivroService) {}

  onClickCadastrarLivro(form: NgForm) {
    if (form.invalid) { //se o form estiver inválido
      return;
    }
    const livro: Livro = {
      titulo: form.value.titulo,
      autor: form.value.autor,
      paginas: form.value.paginas,
    };
    this.livroService.pushLivro(livro);
    form.resetForm();
  }
}
