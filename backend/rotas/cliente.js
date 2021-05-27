const express = require ("express");
const multer = require("multer");
const router = express.Router();
const LivroModel = require("../models/LivroModel");

const MIME_TYPE_EXTENSAO_MAPA = { 'image/png': 'png',  'image/jpeg': 'jpg',  'image/jpg': 'jpg',  'image/bmp': 'bmp'}

const armazenamento = multer.diskStorage({  
  //requisição, arquivo extraido e uma função a ser  
  //executada, capaz de indicar um erro ou devolver  
  //o diretório em que as fotos ficarão  
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error ('Mime Type Invalido');
    callback(null, "backend/imagens")  
  },
  filename: (req, file, callback) =>{
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);  
  }
})

router.get("/", async (req, res) => {
    const livros = await LivroModel.find();
    return res.status(200).json({ mensagem: "Tudo okay", livros });
  });
  
  router.post("/", multer({storage: armazenamento}).single('imagem'),  async (req, res) => {
    const imagemURL = `${req.protocol}://${req.get('host')}`
    console.log(imagemURL)
    const { id, titulo, paginas, autor } = req.body;
    const livro = new LivroModel({ id, titulo, paginas, autor, imagemURL: `${imagemURL}/imagens/${req.file.filename}` });
    await livro.save();
    return res.status(201).json({ mensagem: "livro inserido" , imagemURL});
  });
  
  router.delete("/:id", (req, res, next) => {
    LivroModel.deleteOne({ _id: req.params.id }).then((resultado) => {
      console.log(resultado);
      res.status(200).json({ mensagem: "Livro removido" });
    });
  });
  
  router.put("/:id", multer({ storage: armazenamento }).single('imagem'), (req, res, next) => {
    let imagemURL = req.body.imagemURL;//tentamos pegar a URL já existente  
    if (req.file) { //mas se for um arquivo, montamos uma nova    
      const url = req.protocol + "://" + req.get("host");    
      imagemURL = url + "/imagens/" + req.file.filename;  
    }
    const livro = new LivroModel({
      _id: req.params.id,
      titulo: req.body.titulo,
      paginas: req.body.paginas,
      autor: req.body.autor,
      imagemURL: imagemURL
    });
    LivroModel.updateOne({ _id: req.params.id }, livro).then((resultado) => {
      console.log(resultado);
    });
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  });
  
  router.get("/:id", (req, res) => {
    console.log('aqui')
    LivroModel.findById(req.params.id).then((liv) => {
      if (liv) {
        res.status(200).json(liv);
      } else res.status(404).json({ mensagem: "Livro não encontrado!" });
    });
  });

  module.exports = router;