'use strict';

const mongoose = require('mongoose');

// Primero definimos un esquema
const agenteSchema = mongoose.Schema({
    name: { type: String, index: true }, // Creo un índice para este campo. unique: true, obliga a que sea único
    age: Number
});

// Creamos el modelo
const Agente = mongoose.model( 'Agente', agenteSchema );

// Exportar el modelo
module.exports = Agente;