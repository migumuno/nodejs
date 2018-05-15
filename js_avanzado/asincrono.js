'use strict';

console.log( 'Empiezo' );

// función que escribe un texto tras 2 segundos
function escribeTras2Segundos(texto, callback) {
    setTimeout( () => { // declaración simplificada de función
        console.log( texto );
        callback(22);
    }, 2000 );
}

escribeTras2Segundos( 'Texto 1', () => {
    console.log( 'Termino la primera ejecución.' );
    escribeTras2Segundos( 'Texto 2', () => {
        console.log( 'Termino la segunda ejecución.' );
    } );
} );