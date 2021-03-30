import Livro from './Livro';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
class LivroService {
  constructor(private httpClient: HttpClient) {}

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivroObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

  getLivros() {
    this.httpClient
      .get<{ mensagem: string; livros: Livro[] }>(
        'http://localhost:3333/api/livros'
      )
      .subscribe((dados) => {
        this.livros = dados.livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }

  pushLivro(livro: Livro) {
    const newLivro: Livro = { id: this.livros.length + 1, ...livro };
    this.httpClient.post<{ mensagem: string; livros: Livro[] }>('http://localhost:3333/api/livro', newLivro).subscribe((dado) => {
      this.livros.push(newLivro);
      this.listaLivrosAtualizada.next([...this.livros]);
    });

  }
}

export default LivroService;
