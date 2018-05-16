'use strict';

// definimos una función constructora
function Persona( name ) {
    this.name = name;
}

// construir un objeto
const luis = new Persona( 'Luis' );

// esta forma es más eficiente, solo se guarda una vez y no cada vez que se crea una persona
// además permite que una vez ya creados objetos se le puede asignar nuevos métodos a cada uno de ellos
// de una sola vez.
Persona.prototype.saluda = function() {
    console.log( `Hola, me llamo ${this.name}` );
}

luis.saluda();

// Herencia de Persona ------------------

function Agente(name) {
    // heredar constructor de su padre
    Persona.call(this, name);
}

// heredar las propiedades y métodos del padre
Agente.prototype = new Persona( 'Prototipo' );

const smith = new Agente( 'Smith' );

smith.saluda();

// compruebo que efectivamente es una instancia de Agente y de Persona y también de Object
console.log( smith instanceof Agente );
console.log( smith instanceof Persona );
console.log( smith instanceof Object );

// Herencia múltiple --------------------

// Mixin de Superheroe
function Superheroe() {
    this.vuela = function() {
        console.log( `Estoy volando! [${this.name}]` );
    },
    this.esquivaBalas = function() {
        console.log( `Imposible darme! [${this.name}]` );
    }
}

// copio todas las propiedades de Superheroe al prototipo de Agente
Object.assign( Agente.prototype, new Superheroe() );

smith.vuela();
smith.esquivaBalas();

// realmente no es una instacia pero obtiene las propiedades
console.log( smith instanceof Superheroe );