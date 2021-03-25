import Livro from './Livro'
import { Subject } from 'rxjs';

class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivroObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

  getLivros() {
    return [...this.livros]; //retornando uma cópia dos livros não o original
  }

  pushLivro(livro: Livro) {
    const newLivro:Livro = { id:this.livros.length + 1, ...livro}
    this.livros.push(newLivro);
    this.listaLivrosAtualizada.next([...this.livros]);
  }

}

export default LivroService;
