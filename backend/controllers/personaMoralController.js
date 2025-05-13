const asyncHandler = require('express-async-handler');
const PersonaMoral = require('../models/personasmoralesModel');

// Obtener todas las personas morales
const getPersonasMorales = asyncHandler(async (req, res) => {
    const personasMorales = await PersonaMoral.find();
    res.status(200).json({ personasMorales });
});

// Crear una nueva persona moral
const createPersonaMoral = asyncHandler(async (req, res) => {
    const { razonSocial, rfc, representanteLegal, direccionFiscal, regimenFiscal } = req.body;

    if (!razonSocial || !rfc || !representanteLegal || !direccionFiscal || !regimenFiscal) {
        res.status(400);
        throw new Error("Favor de llenar todos los campos requeridos");
    }

    // Verificar si el RFC ya existe
    const existe = await PersonaMoral.findOne({ rfc });
    if (existe) {
        res.status(400);
        throw new Error("Ya existe una persona moral con ese RFC");
    }

    const personaMoral = await PersonaMoral.create({
        razonSocial,
        rfc,
        representanteLegal,
        direccionFiscal,
        regimenFiscal
    });

    res.status(201).json({ personaMoral });
});

// Actualizar persona moral por ID
const updatePersonaMoral = asyncHandler(async (req, res) => {
    const personaMoral = await PersonaMoral.findById(req.params.id);

    if (!personaMoral) {
        res.status(404);
        throw new Error("Persona moral no encontrada");
    }

    const updated = await PersonaMoral.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
});

// Eliminar persona moral por ID
const deletePersonaMoral = asyncHandler(async (req, res) => {
    const personaMoral = await PersonaMoral.findById(req.params.id);

    if (!personaMoral) {
        res.status(404);
        throw new Error("Persona moral no encontrada");
    }

    await personaMoral.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getPersonasMorales,
    createPersonaMoral,
    updatePersonaMoral,
    deletePersonaMoral
};
