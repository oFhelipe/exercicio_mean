const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: 'string',
    titulo: 'string',
    paginas: 'string',
    autor: 'string'
})

module.exports = mongoose.model('Livro',schema);
