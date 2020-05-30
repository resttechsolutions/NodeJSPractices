const fs = require('fs');

fs.readFile('./ex5.txt', (error, file) => {

    if(error){
        console.log('Ha ocurrido un error');
    } else {

        console.log(file.toString());
    }
});

console.log('Fin de ejecucion');