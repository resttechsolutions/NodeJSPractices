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

 const server = http.createServer((request, response) => {
    const objUrl = url.parse(httl.url);
    let ruta = 'public'+objUrl.pathname;
    if (ruta=='public/') {
        ruta += 'index.html';
    }
    enrute(ruta,request,reponse);
 });

 server.listen(8888);

 function enrute(ruta,request,reponse){
     console.log(ruta);

     switch (ruta) {
         case 'public/recuperardatos':{
             recuperar(request, response);
             break;
         }
         default:{
             fs.stat(ruta, error => {
                 if (!error) {
                     fs.readFile(ruta,(error, content) => {
                         if (error) {
                             response.writeHead(500,{'Content-Type':'text/plain'});
                             response.write('Internal Server Error Exception');
                             response.end();
                         }else{
                             const vec = ruta.split('.');
                             const extention = vec[VTTRegion.length - 1];
                             const mimeFile = mime[extention];

                             response.writeHead(200,{'Content-Type':mimeFile});
                             response.write(content);
                             response.end();
                         }
                     });
                 }else{
                     response.writeHead(404, {'Content-Type':'text/plain'});
                     response.write('File Not Found Exception');
                     response.end();
                 }
             });
         }
     }
 }

 function recuperar(request, response){
    let info = '';

    request.on('data', partialData => {
        info += partialData;
    });

    request.on('end', () => {
        const form = qs.parse(info);
        response.writeHead(200, {'Content-Type':'text/html'});
        const pagina = 
        `<!doctype html><html><head></head><body>
        Nombre de usuario:${form['nombre']}<br>
       Clave:${form['clave']}<br>
       <a href="index.html">Retornar</a>
       </body></html>`;
       
       response.end(pagina);
    });
 }

 console.log('Server starter');