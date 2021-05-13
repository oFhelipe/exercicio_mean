import Livro from './Livro';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      .get<{ mensagem: string; livros: any }>(
        'http://localhost:3333/api/livros'
      )
      .pipe(
        map((dados) => {
          return dados.livros.map((livro) => {
            return {
              id: livro._id,
              titulo: livro.titulo,
              paginas: livro.paginas,
              autor: livro.autor,
            };
          });
        })
      )
      .subscribe((livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }

  removerLivro(id: string): void {
    this.httpClient
      .delete(`http://localhost:3333/api/livros/${id}`)
      .subscribe(() => {
        this.livros = this.livros.filter((livro) => {
          return livro.id !== id;
        });
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }

  pushLivro(livro: Livro) {
    const newLivro: Livro = { ...livro };
    this.httpClient
      .post<{ mensagem: string; livros: Livro[] }>(
        'http://localhost:3333/api/livro',
        newLivro
      )
      .subscribe((dado) => {
        this.livros.push(newLivro);
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }

  pegarLivros(idLivro: string) {
    return this.httpClient.get<{
      _id: string;
      titulo: string,
      paginas: string,
      autor: string,
    }>(`http://localhost:3333/api/livros/${idLivro}`);
  }

  atualizarLivro(id: string, titulo: String, autor: String, paginas: String) {
    const livro: Livro = { id, titulo, autor, paginas };
    this.httpClient
      .put(`http://localhost:3333/api/livros/${id}`, livro)
      .subscribe((res) => {
        const copia = [...this.livros];
        const indice = copia.findIndex((liv) => liv.id === livro.id);
        copia[indice] = livro;
        this.livros = copia;
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }
}

export default LivroService;
