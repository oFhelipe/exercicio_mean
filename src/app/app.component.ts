import { Component } from '@angular/core';
import Livro from './livros/Livro'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  livros:Livro[] = []

  adicionarLivro(livro) {
    let newLivro = { id:this.livros.length + 1, ...livro}
    this.livros.push(newLivro);
  }
}
