'use strict';

const persona = {
    name: 'Mike',
    surname: 'Wasowski',
    // fullname: () => { // el problema de usar esta nomenclatura es que cambia el contexto del this y devolvería undefined
    fullname: function() {
        console.log( this.name + ' ' + this.surname );
    }
};

persona.fullname();

// const metodo = persona.fullname;
// metodo(); // Esto falla por usar intermediarios, cambia el contexto del this

setTimeout( persona.fullname, 1000 ); // Pasa lo mismo que el anterior, el contexto del this es setTimeout

// bind para definir el contexto del this
setTimeout( persona.fullname.bind(persona), 1000 ); // Esto si funciona porque le hemos forzado el contexto a persona

// si quisieramos cambiar el this a pesar de estar definido usamos call o apply
persona.fullname.call( {name: 'Jack', surname: 'Ryan'} );