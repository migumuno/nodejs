'use strict';

console.log( 'Empiezo' );

// función que escribe un texto tras 2 segundos
function escribeTras2Segundos(texto, callback) {
    setTimeout( () => { // declaración simplificada de función
        console.log( texto );
        callback(22);
    }, 1000 );
}

function bucle( arr, fn, callbackFin ) {
    if (arr.length != 0) {
        fn( arr.shift(), () => {
            // cuando termine, se llama a si misma
            bucle( arr, fn, callbackFin );
        } );
    } else {
        // termino
        callbackFin();
    }
}

bucle( [1,2,'Hola','que ase',5], escribeTras2Segundos, () => {
    console.log( 'Fin' );
} );