const express = require("express");
const cors = require("cors");
const { mongoHost, mongoPassword } = require("./env");
const app = express();
const path = require ('path');

const mongoose = require("mongoose");
const dataBase = "livros-database";

const clienteRoutes = require('./rotas/cliente')

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
app.use('/imagens', express.static(path.join("backend/imagens")));
app.use('/api/livros', clienteRoutes);


module.exports = app;
