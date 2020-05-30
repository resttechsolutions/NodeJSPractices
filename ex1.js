const PI = 3.14;

function sumar(x1, x2){
    return x1 + x2;
}

function restar(x1, x2){
    return x1 - x2;
}

function dividir(x1, x2){
    let result;

    if(x2 == 0){

        mostrarError();
    } else {

        result = x1 / x2;
    }
    return result;
}

function mostrarError(){

    console.log('No se puede divididr entre cero');
}

exports.sumar=sumar;
exports.restar=restar;
exports.dividir=dividir;
exports.PI=PI;