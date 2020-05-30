const http = require('http');
const url = require('url');
const fs = require('fs');


const servidor = http.createServer((request, response) => {

    const objUrl = url.parse(request.url);

    let ruta = 'static' + objUrl.pathname;

    if(ruta == 'static/'){
        ruta = 'static/index.html';
    }

    fs.stat(ruta, error => {

        if(!error){

            fs.readFile(ruta, (error, contenido) => {
                if(error){

                    response.writeHead(500, {'Content-Type':'text/plain'});
                    response.write('Error interno');
                    response.end();
                }else{

                    response.writeHead(200, {'COntent-Type':'text/html'});
                    response.write(contenido);
                    response.end();
                }
            });
        }
    });
});

servidor.listen(8888);

console.log('Servidor web iniciado');