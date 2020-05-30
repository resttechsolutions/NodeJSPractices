const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname +'/public'));

app.use(bodyParser.urlencoded({extends:false}));

app.post('/mostrarnumeros', (request, response) => {
    let num1 = parseInt(request.body.numero1);
    let num2 = parseInt(request.body.numero2);

    let pagina='<!doctype html><html><head></head><body>';

    for (let x = num1; x <= num2; x++) {
        pagina += `<a href="/mostrartabla?valor=${x}">${x}</a> <br> `;        
    }

    pagina += '</body></html>';
    response.send(pagina);
});


app.get('/mostrartabla', (request, response) =>{
    let num = parseInt(request.query.valor);

    let pagina='<!doctype html><html><head></head><body>';

    for(let i = 1; i < 10; i++){
        pagina += `${num} * ${i} = ${num * i} <br>`;
    }

    pagina += '<a href="index.html">Retornar</a>';
    pagina += '</body></html>';

    response.send(pagina);
});

var server = app.listen(8888, () => {
    console. log('Server Starter');
});