'use strict';

const express = require('express');
const router = express.Router();

const Agente = require('../../models/Agente');

// Obtener agentes
router.get('/', (req, res, next) => {
    Agente.find().exec( (err, docs) => {
        if(err) {
            next(err);
            return;
        }

        // sino hay error
        res.json({ success: true, result: docs });
    } );
});

// Crear agentes
router.post('/', (req, res, next) => {
    console.log( req.body );
    const data = req.body;

    // Creamos documento de agente en memoria
    const agente = new Agente(data);

    // Lo guardamos en la BBDD
    agente.save( (err, agenteGuardado) => {
        if(err) {
            next(err);
            return;
        }

        res.json({ success: true, result: agenteGuardado });
    } );
});

module.exports = router;