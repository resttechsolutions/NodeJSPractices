const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  : 'audio/mpeg3',
    'mp4'  : 'video/mp4'
 };

const server = http.createServer((request,response) =>{
    const objUrl = url.parse(http.url);
    let ruta = 'public/' + objUrl.pathname;

    if (ruta=='public/') {
        ruta += 'index.html';
    }

    enrute(request,response,ruta);
});

server.listen(8888);

function enrute(request,response,ruta){
    switch (ruta) {
        case 'public/cargar':
            saveComments(request,response);
            break;
    
        case 'public/readComments': 
            readComments(respuesta);
            break;

        default:
            fs.stat(ruta,error =>{
                if (!error) {
                    fs.readFile(ruta, (error, content) => {
                        if (error) {
                            response.writeHead(500, {'Content-Type':'text/plain'});
                            response.write('Internal Server Error Exception');
                            response.end();
                        }else {
                            const vec = ruta.split('.');
                            const ext = vec[vec.length - 1];
                            const mimeExt = mime[ext];

                            response.writeHead(200, {'Content-Type': mimeExt});
                            response.write(content);
                            response.end();
                        }
                    });
                }else{
                    response.writeHead(404,{'Content-Type':'text/html'});
                    response.write('<!doctype html><html><head></head><body>Error 404 File Not Found Exception</body></html>');
                    response.end();
                }
            });
            break;
    }
}

function saveComments(request, response){
    let info = '';

    request.on('data', parcialData => {
        info += parcialData;
    });

    request.on('end', function(){
        const form = qs.parse(info);
        
        response.writeHead(200,{'Content-Type':'text/html'});

        const page = `<!doctype html><html><head></head><body>
        Nombre:${form['nombre']}<br>
        Comentarios:${form['comentarios']}<br>
        <a href="index.html">Retornar</a>
        </body></html>`;

        response.end(page);

        safeInFile(form);
    });
}

function safeInFile(form){
    const data = `nombre:${form['nombre']}<br>
                    comentario:${form['comentario']}<hr>`;
    fs.appendFile('public/visitas.txt', data, error => {
        if(error)
        console.log(error);
    });
}

function readComments(response){
    fs.readFile('public/visitas.txt', (error,data) => {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write('<!doctype html><html><head></head><body>');
        response.write(data);
        response.write('</body></html>');
        response.end();
    })
}