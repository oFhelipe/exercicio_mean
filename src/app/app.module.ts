import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LivroInserirComponent } from './livros/livro-inserir/livro-inserir.component';
import { FormsModule } from '@angular/forms';
import LivroService from './livros/Livro.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LivroListaComponent } from './livros/livro-lista/livro-lista.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [AppComponent, LivroInserirComponent, LivroListaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [LivroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
