const http = require('http');
const url = require('url');
const fs = require('fs');

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  :  'audio/mpeg3',
    'mp4'  : 'video/mp4'
 };

 const cache = {};

const server = http.createServer((request, response) => {
    const objUrl = url.parse(request.url);

    let ruta = 'static' + objUrl.pathname;

    if (ruta=='static/') {
        ruta += 'index.html';
    }

    if (cache[ruta]) {
        const vec = ruta.split('.');
        const extention = vec[vec.length - 1];
        const mimeFile = mime[extention];

        response.writeHead(200, {'Content-Type':mimeFile});
        response.write(cache[ruta]);
        response.end();

        console.log('Resource got from the cache ' + ruta);   
    }else{

        fs.stat(ruta, error =>{

            if(!error){
                fs.readFile(ruta, (error, content) => {
                    if (error) {
                        response.writeHead(500, {'Content-Type':'text/plain'});
                        response.write('Internal Server Error Exception ' + ruta);
                        response.end();
                    } else {
                        cache [ruta] = content;
                        const vec = ruta.split('.');
                        const extention = vec[vec.length - 1];
                        const mimeFile = mime[extention];
        
                        response.writeHead(200, {'Content-Type':mimeFile});
                        response.write(content);
                        response.end();
        
                        console.log('File read from the disk ' + ruta);
                    }
                });
            } else {
                response.writeHead(404,{'Content-Type':'text/plain'});
                response.write('<!doctype html><html><head></head><body>File Not Found Exception</body></html>');
                response.end();
            }
            
            
        });
    } 

});

server.listen(8888);

console.log('Server started');