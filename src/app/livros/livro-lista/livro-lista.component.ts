import { Component, OnInit, OnDestroy } from '@angular/core';
import Livro from '../Livro'
import LivroService from '../Livro.service'
import { Subscription, Observable } from 'rxjs'

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit, OnDestroy{

  constructor(public livroService:LivroService){}
  livros: Livro[] = []
  private livrosSubscription: Subscription;

  ngOnInit(): void {
    this.livroService.getLivros();
    this.livrosSubscription = this.livroService.getLivroObservable().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ngOnDestroy(): void {
    this.livrosSubscription
  }

  onDelete(id: string): void{
    this.livroService.removerLivro(id);
  }
}
