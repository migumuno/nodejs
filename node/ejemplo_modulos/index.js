'use strict';

const calculadora = require( './calculadora' );

console.log( calculadora.dividir( 1, 5 ) );

calculadora.constante_de_calculo = 3.141516;

const calculadora2 = require( './calculadora' );

console.log( calculadora2.constante_de_calculo );