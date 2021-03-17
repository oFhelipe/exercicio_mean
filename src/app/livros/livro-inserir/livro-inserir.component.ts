import { Component, EventEmitter, Output } from '@angular/core';
import Livro from '../Livro';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})
export class LivroInserirComponent {
  titulo: string;
  autor: string;
  paginas: string;

  @Output() eventoCadastrarLivro = new EventEmitter<Livro>();

  onClickCadastrarLivro() {
    const livro: Livro = {
      titulo: this.titulo,
      autor: this.autor,
      paginas: this.paginas,
    };
    this.eventoCadastrarLivro.emit(livro);
  }
}
