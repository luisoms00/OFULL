const asyncHandler = require('express-async-handler');
const PersonaFisica = require("../models/personasfisicasModel");

const getPersonasFisicas = asyncHandler(async (req, res) => {
    const personasFisicas = await PersonaFisica.find();
    res.status(200).json({ personasFisicas });
});

const createPersonaFisica = asyncHandler(async (req, res) => {
    const { nombre, rfc, curp, direccion, regimenFiscal } = req.body;

    if (!nombre || !rfc || !curp || !direccion || !regimenFiscal) {
        res.status(400);
        throw new Error("Favor de llenar todos los campos requeridos");
    }

    const personaFisica = await PersonaFisica.create({
        nombre,
        rfc,
        curp,
        direccion,
        regimenFiscal
    });

    res.status(201).json({ personaFisica });
});

const updatePersonaFisica = asyncHandler(async (req, res) => {
    const personaFisica = await PersonaFisica.findById(req.params.id);

    if (!personaFisica) {
        res.status(404);
        throw new Error('Persona física no encontrada');
    }

    const personaFisicaUpdated = await PersonaFisica.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(personaFisicaUpdated);
});

const deletePersonaFisica = asyncHandler(async (req, res) => {
    const personaFisica = await PersonaFisica.findById(req.params.id);

    if (!personaFisica) {
        res.status(404);
        throw new Error('Persona física no encontrada');
    }

    await personaFisica.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getPersonasFisicas,
    createPersonaFisica,
    updatePersonaFisica,
    deletePersonaFisica
};
