const os = require('os');

console.log('Cantidad de espacio en memoria disponible antes del vector' + os.freemem);

let vec = [];

for(let i = 0; i < 1000000; i++){

    vec(i);
}

console.log('Cantidad de espacio en memoria disponible despues del vector' + os.freemem);