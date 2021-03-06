'use strict';

// Función que retorna una promesa
function sleep(ms) {
    return new Promise((resolve, reject) => {
        // Aquí es donde hago la parte asíncrona
        setTimeout(() => {
            resolve('Resultado'); // indica que todo correcto
            // reject(new Error('Error de promesa.')); // indica que hubo error
        }, ms);
    });
}

// Utilizando la promesa
const promesa = sleep(2000);

console.log(promesa);

// Para ejecutar algo cuando termine la promesa
promesa.then(result => {
    console.log('La promesa se resolvió', result);
}).catch(err => {
    console.log('Promesa fallida', err);
});