const http = require('http');
const url = require('url');
const fs = require('fs');

const mime = {
    'html': 'txt/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
};

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
                    const vec = ruta.split('.');

                    const extention = vec[vec.length-1];

                    const mimeFile = mime[extention];

                    response.writeHead(200, {'Coontent-Type':'text/html'});
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