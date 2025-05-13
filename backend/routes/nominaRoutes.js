const express = require('express');
const router = express.Router();
const {
    getNominas,
    createNomina,
    updateNomina,
    deleteNomina
} = require('../controllers/nominaController');

// Obtener todas las nóminas
router.get('/', getNominas);

// Crear una nueva nómina
router.post('/', createNomina);

// Actualizar una nómina existente por ID
router.put('/:id', updateNomina);

// Eliminar una nómina por ID
router.delete('/:id', deleteNomina);

module.exports = router;
