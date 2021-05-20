const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: 'string',
    titulo: 'string',
    paginas: 'string',
    autor: 'string',
    imagemURL: {type: String, required: true}
})

module.exports = mongoose.model('Livro',schema);
