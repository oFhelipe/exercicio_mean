export default interface Livro {
  id?: string;
  titulo: string;
  autor: string;
  paginas: string;
  imagem?: File | string
}
