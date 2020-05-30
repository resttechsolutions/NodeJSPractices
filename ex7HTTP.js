const http = require('http');

const servidor = http.createServer((request, response) => {

    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(`<!doctype html><html>
    <head></head>
    <body>
    <h1>Under Construction...
    </h1>
    </body>
    </html>`);

    response.end();
});

servidor.listen(8888);
console.log('Servidor Iniciado');