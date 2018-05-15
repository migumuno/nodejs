'use strict';

// Un closure es una función que devuelve otra
// patron factory
function creaAgente( nombre ) {
    return {
        getNombre: function() {
            return nombre;
        },
        setNombre: function(valor) {
            nombre = valor;
        },
        saluda: function() {
            console.log( `Hola soy ${nombre}` );
        }
    }
}

const smith = creaAgente( 'Smith' );
smith.saluda();
