const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const livros = [
  {
    id: 1,
    titulo: 'Livro 1',
    paginas: 200,
    autor: 'Autor 1'
  }
]

app.get('/api/livros',(req, res) => {
  return res.status(200).json({mensagem:'Tudo okay', livros});
});

app.post('/api/livro',(req, res) => {
  const livro = req.body;
  livros.push(livro);
  return res.status(201).json({mensagem: 'livro inserido'});
});

module.exports = app;
