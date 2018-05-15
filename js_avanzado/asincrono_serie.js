'use strict';

console.log( 'Empiezo' );

// función que escribe un texto tras 2 segundos
function escribeTras2Segundos(texto, callback) {
    setTimeout( () => { // declaración simplificada de función
        console.log( texto );
        callback(22);
    }, 1000 );
}

function bucle( init, max, fn, callbackFin ) {
    init++;
    if (init <= max) {
        fn( init, () => {
            // cuando termine, se llama a si misma
            bucle( init, max, fn, callbackFin );
        } );
    } else {
        callbackFin();
    }
}

bucle( 0, 5, escribeTras2Segundos, () => {
    console.log( 'Fin' );
} );