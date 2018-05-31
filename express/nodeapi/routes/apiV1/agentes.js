'use strict';

const express = require('express');
const router = express.Router();

const Agente = require('../../models/Agente');

// Obtener agentes
router.get('/', async (req, res, next) => {
    // Versión extendida
    /*Agente.find().exec( (err, docs) => {
        if(err) {
            next(err);
            return;
        }

        // sino hay error
        res.json({ success: true, result: docs });
    } );*/

    // Con promesas
    /*Agente.find().exec().then( docs => {
        res.json({ success: true, result: docs });
    } ).catch(err => {
        next(err);
    });*/

    // Con async await
    try {
        const docs = await Agente.find().exec();
        res.json({ success: true, result: docs });
    } catch(err) {
        next(err);
        return;
    }
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

// Borrar agente indicado
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        await Agente.remove( {_id: _id} ).exec();
        res.json( { success: true } );
    } catch(err) {
        next(err);
        return;
    }
})

module.exports = router;

// Actualiza un agente
router.put( '/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        
        const agenteActualizado = await Agente.findByIdAndUpdate( _id, data, {
            new: true
        } );

        res.json({ success:true, result: agenteActualizado });
    } catch(err) {
        next(err);
        return;
    }
} );