const http = require('http');
const app = require('./app')
const server = http.createServer(app);

const port = process.env.PORT || 3333;

server.listen(port,() => {
  console.log(`Servidor iniciada na porta ${port}`)
})
