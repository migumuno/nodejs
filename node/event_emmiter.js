'use strict';

// La documentación de estas librerías está en nodejs.org/es/docs/
const EventEmitter = require( 'events' );

// creamos un emisor de eventos
const emisor = new EventEmitter();

emisor.on( 'llamada de telefono', function( quienLlama ){
    if( quienLlama === 'madre' ) {
        console.log( 'tienes un mensaje' );
    } else {
        console.log( 'ring ring' );
    }
} );

emisor.once( 'llamada de telefono', function() {
    console.log( 'brr brr' );
} );

emisor.emit( 'llamada de telefono', 'madre' ); // se pueden pasar parámetros
emisor.emit( 'llamada de telefono' );
emisor.emit( 'llamada de telefono' );
emisor.emit( 'llamada de telefono' );