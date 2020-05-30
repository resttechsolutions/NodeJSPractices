const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime');
const formidable = require('formidable');

const server = http.createServer((request, response) => {
    const objUrl = url.parse(request.url);
    let ruta = 'public' + objUrl.pathname;

    if(ruta=='public/')
        ruta += 'index.html';

    encaminar(request,response,ruta);
});

server.listen(8888);

function encaminar(request,response,ruta){
    switch (ruta) {
        case 'public/subir':
            subir(request,response);
            break;
        case 'public/listadofotos':
            listar(response);
            break;
        default:
            fs.stat(ruta,error => {
                if (!error) {
                    fs.readFile(ruta,(error,content) => {
                        if (error) {
                            response.writeHead(500,{'Content-Type':'plain/text'});
                            response.write('Internal Server Error Exception');
                            response.end();
                        } else {
                            response.writeHead(200, {'Content-Type':mime.getType(ruta)});
                            response.write(content);
                            response.end();
                        }
                    });
                } else {
                    response.writeHead(404,{'Content-Type':'text/html'});
                    response.write('<!doctype html><html><head></head><body>File Not Found Exception</body></html>');
                    response.end();
                }
            });
            break;
    }
}

function subir(request,response){
    const entrada = new  formidable.IncomingForm();
    entrada.uploadDir = 'upload';
    entrada.parse(request);

    entrada.on('fileBegin', (field, file) => {
        file.path = "./public/upload/" + file.name;
    });

    entrada.on('end', function (){
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write('<!doctype html><html><head></head><body>'+
        'Archivo subido<br><a href="index.html">Retornar</a></body></html>');
        response.end();
    });
}

function listar(response){
    fs.readdir('./public/upload/', (error, files) => {
        let photo = '';

        for (let i = 0; i < files.length; i++) {
            photo += `<img src="upload/${files[i]}" width="20%" height="20%"><hr>`;
        }

        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(`<!doctype html><html><head></head>
        <body>${photo}<a href="index.html">
        Retornar</a></body></html>`);
        response.end();
    });
}

console.log('Server started');