const express = require('express');
const router = express.Router();
const {
    getPersonasMorales,
    createPersonaMoral,
    updatePersonaMoral,
    deletePersonaMoral
} = require('../controllers/personaMoralController');

// Obtener todas las personas morales
router.get('/', getPersonasMorales);

// Crear una nueva persona moral
router.post('/', createPersonaMoral);

// Actualizar persona moral por ID
router.put('/:id', updatePersonaMoral);

// Eliminar persona moral por ID
router.delete('/:id', deletePersonaMoral);

module.exports = router;
