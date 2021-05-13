const express = require("express");
const cors = require("cors");
const { mongoHost, mongoPassword } = require("./env");
const app = express();

const LivroModel = require("./models/LivroModel");

const mongoose = require("mongoose");
const dataBase = "livros-database";

mongoose
  .connect(
    `mongodb://${mongoHost}:${mongoPassword}@cluster0-shard-00-00.ahgr3.mongodb.net:27017,cluster0-shard-00-01.ahgr3.mongodb.net:27017,cluster0-shard-00-02.ahgr3.mongodb.net:27017/${dataBase}?ssl=true&replicaSet=atlas-7d6316-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Banco conectado");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(cors());

app.get("/api/livros", async (req, res) => {
  const livros = await LivroModel.find();
  return res.status(200).json({ mensagem: "Tudo okay", livros });
});

app.post("/api/livro", async (req, res) => {
  const { id, titulo, paginas, autor } = req.body;
  const livro = new LivroModel({ id, titulo, paginas, autor });
  await livro.save();
  return res.status(201).json({ mensagem: "livro inserido" });
});

app.delete("/api/livros/:id", (req, res, next) => {
  LivroModel.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Livro removido" });
  });
});

app.put("/api/livros/:id", (req, res, next) => {
  const livro = new LivroModel({
    _id: req.params.id,
    titulo: req.body.titulo,
    paginas: req.body.paginas,
    autor: req.body.autor,
  });
  LivroModel.updateOne({ _id: req.params.id }, livro).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

app.get("/api/livros/:id", (req, res) => {
  console.log('aqui')
  LivroModel.findById(req.params.id).then((liv) => {
    if (liv) {
      res.status(200).json(liv);
    } else res.status(404).json({ mensagem: "Livro não encontrado!" });
  });
});

module.exports = app;
