const asyncHandler = require('express-async-handler');
const Nomina = require("../models/nominaModel");

const getNominas = asyncHandler(async (req, res) => {
    const nominas = await Nomina.find();
    res.status(200).json({ nominas });
});

const createNomina = asyncHandler(async (req, res) => {
    const { empleado, rfcEmpleado, sueldoBruto, sueldoNeto, impuestosRetenidos, fechaPago } = req.body;

    if (!empleado || !rfcEmpleado || !rfcEmpleado || !sueldoNeto || !impuestosRetenidos || !fechaPago) {
        res.status(400);
        throw new Error("Favor de llenar todos los campos requeridos");
    }

    const nomina = await Nomina.create({
        empleado,
        rfcEmpleado,
        sueldoBruto,
        sueldoNeto,
        impuestosRetenidos,
        fechaPago
    });

    res.status(201).json({ nomina });
});

const updateNomina = asyncHandler(async (req, res) => {
    const nomina = await Nomina.findById(req.params.id);

    if (!nomina) {
        res.status(404);
        throw new Error('Nómina no encontrada');
    }

    const nominaUpdated = await Nomina.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(nominaUpdated);
});

const deleteNomina = asyncHandler(async (req, res) => {
    const nomina = await Nomina.findById(req.params.id);

    if (!nomina) {
        res.status(404);
        throw new Error('Nómina no encontrada');
    }

    await nomina.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getNominas,
    createNomina,
    updateNomina,
    deleteNomina
};
