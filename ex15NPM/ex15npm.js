const http = require('http');
const url = require('url');
const fs = require('fs');

const mime = require('mime');

const servidor = http.createServer((request, response) => {
    const objUrl = url.parse(request.url);

    let ruta = 'static' + objUrl.pathname;

    if (ruta == 'static/') {
        ruta = 'static/index.html'
    }

    fs.stat(ruta, error => {
        if (!error) {
            fs.readFile(ruta, (error, content) => {
                if (error) {
                    response.writeHead(500, {'Content-Type':'Internal Server Error'});
                    response.write('<!doctype html><html><head></head><body>Iternal Server Error Exception</body></html>');
                    response.end();
                } else {

                    response.writeHead(200, {'Coontent-Type': mime.getType(ruta)});
                    response.write(content);
                    response.end();
                }
            });
        } else {
            response.writeHead(404, {'Content-Type':'text/html'});
            response.write('<!doctype html><html><head></head><body>Not Found Exception</body></html>');
            response.end();
        }
    })
});

servidor.listen(8888);

console.log('Servidor inicializado');