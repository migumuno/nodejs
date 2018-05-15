'use strict';

console.log( 'Empiezo' );

// función que escribe un texto tras 2 segundos
function escribeTras2Segundos(texto) {
    setTimeout( () => { // declaración simplificada de función
        console.log( texto );
    }, 2000 );
}

escribeTras2Segundos( 'Texto 1' );
escribeTras2Segundos( 'Texto 2' );