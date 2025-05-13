const express = require('express');
const router = express.Router();
const {
    getPersonasFisicas,
    createPersonaFisica,
    updatePersonaFisica,
    deletePersonaFisica
} = require('../controllers/personafisicaController');

// Obtener todas las personas físicas
router.get('/', getPersonasFisicas);

// Crear una nueva persona física
router.post('/', createPersonaFisica);

// Actualizar persona física por ID
router.put('/:id', updatePersonaFisica);

// Eliminar persona física por ID
router.delete('/:id', deletePersonaFisica);

module.exports = router;
