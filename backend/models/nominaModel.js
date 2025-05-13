const mongoose = require("mongoose");

const nominaSchema = mongoose.Schema({
    empleado: {
        type: String,
        required: [true, "Por favor ingresa el nombre del empleado"]
    },
    rfcEmpleado: {
        type: String,
        required: [true, "Por favor ingresa el RFC del empleado"],
    },
    sueldoBruto: {
        type: Number,
        required: [true, "Por favor ingresa el sueldo bruto del empleado"]
    },
    sueldoNeto: {
        type: Number,
        required: [true, "Por favor ingresa el sueldo neto del empleado"]
    },
    impuestosRetenidos: {
        type: Number,
        required: [true, "Por favor ingresa el total de impuestos retenidos"]
    },
    fechaPago: {
        type: Date,
        required: [true, "Por favor ingresa la fecha de pago"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Nomina", nominaSchema);
