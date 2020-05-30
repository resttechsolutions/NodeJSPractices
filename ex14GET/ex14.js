const http = require('http');
const url = require('url');
const fs = require('fs');

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  :	'audio/mpeg3',
    'mp4'  : 'video/mp4'
 };

 const server = http.createServer((request, response) =>{
     const objUrl = url.parse(request.url);
     let ruta = 'public' + objUrl.pathname;

     if (ruta=='public/') {
         ruta += 'index.html';
     }

     enrute(request,response,ruta);
 });

 server.listen(8888);

 function enrute(request,response,ruta){
     switch (ruta) {
         case 'public/listanumeros':
             listar(request,response);
             break;
        case 'public/listadotabla':
            listarTablaMultiplicar(request,response);
        break;
     
         default:
             fs.stat(ruta, error =>{
                 if(!error){
                     fs.readFile(ruta, (error, content) => {
                         if (error) {
                            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                            respuesta.write('Error interno');
                            respuesta.end();
                         }else{
                            const vec = camino.split('.');
                            const extension=vec[vec.length-1];
                            const mimearchivo=mime[extension];
                            respuesta.writeHead(200, {'Content-Type': mimearchivo});
                            respuesta.write(contenido);
                            respuesta.end();
                         }
                     });
                 }else{
                    respuesta.writeHead(404, {'Content-Type': 'text/html'});
                    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
                    respuesta.end();
                 }
             });
             break;
     }
 }

 function listar(request,response){
     const info = '';

     response.writeHead(200, {'Content-Type':'text/html'});

     let pagina='<!doctype html><html><head></head><body>';
     for(let f = 1; f < 20; f++){
        pagina+=`<a href="listadotabla?num=${f}">${f}</a><br>`;
     }
     pagina+='</body></html>';
     respuesta.end(pagina);
 }

 function listarTablaMultiplicar(request,response) {
     const valor = url.parse(request.url, true).query.num;
     respuesta.writeHead(200, {'Content-Type': 'text/html'});
    let pagina='<!doctype html><html><head></head><body>';
    for(let f=1;f<=10;f++) {
        pagina+=`${valor}*${f}=${valor*f}<br>`;
    }		   
    pagina+='</body></html>';
    respuesta.end(pagina);
 }

 console.log('Servidor web iniciado');