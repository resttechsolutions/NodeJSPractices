const http = require('http');
const url = require('url');

const servidor = http.createServer((request, response) => {

    const objUrl = url.parse(request.url);
    console.log('Ruta completa... ' + objUrl.path);
    console.log('Ruta y archivo solicitado... ' + objUrl.pathname);
    console.log('Parametros... ' + objUrl.query);

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

console.log('Servidor iniciado');