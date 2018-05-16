'use strict';

console.log( 'Módulo calculadora' );

// Para definir lo que se va a exportar
// module.exports es un objeto vacío a no ser que se añadan cosas
module.exports.sumar = function(a, b) {
    return a + b;
}

module.exports.restar = function(a, b) {
    return a - b;
}

module.exports.multiplicar = function(a, b) {
    return a * b;
}

module.exports.dividir = function(a, b) {
    return a / b;
}

