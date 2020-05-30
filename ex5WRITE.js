const fs = require('fs');

const str = 'wrfefeeerfveqve';

fs.writeFile('./ex5.txt', str, error => {

    if(error){
        console.log('Ha ocurrido un error en la creacion');
    } else {

        console.log('Archivo creado.');
    }
});

console.log('Fin de ejecucion');