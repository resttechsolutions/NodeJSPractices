const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime');
const mysql = require('mysql');
const qs = require('querystring');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'base1'
});

con.connect(error => { 
    if(error){
        console.log(error);
    }else{
        console.log('Connected');
    }
});

const server = http.createServer((request,response) => {
    const objUrl = url.parse(request.url);
    let ruta = 'public' + objUrl.pathname;

    if (ruta == 'public/') {
        ruta += 'index.html';
    }
    encaminar(request,response,ruta);
});

server.listen(8888);

function encaminar(request,response,ruta){
    switch (ruta) {
        case 'public/creartabla':
            crear(response);
            break;
        case 'public/alta':
            alta(request,response);
            break;
        case 'public/listado':
            listado(response);
            break;
        case 'public/consultaporcodigo':
            consulta(request, response);
            break;
        default:
            fs.stat(ruta, error => {
                if (!error) {
                    fs.readFile(ruta, (error, content) =>{
                        if (error) {
                            response.writeHead(500, {'Content-Type': 'plain/text'});
                            response.write('Internal Server Error Exception');
                            response.end();
                        }else{
                            response.writeHead(200, {'Content-Type': mime.getType(ruta)});
                            response.write(content);
                            response.end();
                        }
                    });
                }else{
                    response.writeHead(404, {'Content-Type': 'plain/text'});
                    response.write('File Not Found Exception');
                    response.end();                
                }
            })
            break;
    }
}

function crear(response){
    con.query('drop table if exists articulos', (error, result) => {
        if (error) {
            console.log(error);
        }
    });

    con.query(`create table articulos (
        codigo int primary key auto_increment,
        descripcion varchar(50),
        precio float
    )`, (error,result) => {
        if (error) {
            console.log(error);
            return;
        }
    });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`<!doctype html><html><head></head><body>
                  Se creo la tabla<br><a href="index.html">Retornar</a></body></html>`);		
    response.end();
}

function alta(request,response){
    info = '';

    request.on('data', partialData => {
        info += partialData;
    });

    request.on('end', () => {
        const form = qs.parse(info);
        const registro = {
            descripcion: form['descripcion'],
            precio: form['precio']
        };

        con.query('insert into articulos set ?', registro, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
        });

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`<!doctype html><html><head></head><body>
                    Se cargo el articulo<br><a href="index.html">Retornar</a></body></html>`);		
        response.end();

    });


}

function listado(response){
    con.query('select codigo, descripcion, precio from articulos', (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
    
        let datos = '';

        for (let i = 0; i < result.length; i++) {
            datos += 'Codigo:' + result[i].codigo + '</br>';
            datos += 'Descripcion:' + result[i].descripcion + '</br>';
            datos += 'Precio:' + result[i].precio + '</hr>';
        }

        response.write('<!doctype html><html><head></head><body>');
        response.write(datos);	
        response.write('<a href="index.html">Retornar</a>');
        response.write('</body></html>');
        response.end();
    });   
}

function consulta(request, response){
    let info = '';

    request.on('data', partialData => {
        info += partialData;
    });

    request.on('end', () => {
        const form = qs.parse(info);
        const dato = [form['codigo']];

        con.query('select descripcion, precio from articulos where codigo = ?', dato, (error, result) => {
            if(error){
                console.log(error);
                return;
            }
            response.writeHead(200, {'Content-Type':'text/html'});
            let datos = '';

            if (result.length > 0) {
                datos += 'Descripcion: ' + result[0].descripcion + '<br>';
                datos += 'Precio: ' + result[0].precio + '<br>'; 
            } else {
                datos = 'No existe articulo con dicho codigo';
            }
            response.write('<!doctype html><html><head></head><body>');
            response.write(datos);	
            response.write('<a href="index.html">Retornar</a>');			
            response.write('</body></html>');
            response.end();	
        });
    });
}

console.log('Server starter');