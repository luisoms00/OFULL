const mongoose = require("mongoose");

const personaMoralSchema = mongoose.Schema({
    razonSocial: {
        type: String,
        required: [true, "Por favor ingresa la razón social de la persona moral"]
    },
    rfc: {
        type: String,
        required: [true, "Por favor ingresa el RFC de la persona moral"],
        unique: true
    },
    representanteLegal: {
        type: String,
        required: [true, "Por favor ingresa el nombre del representante legal"]
    },
    direccionFiscal: {
        type: String,
        required: [true, "Por favor ingresa la dirección fiscal de la persona moral"]
    },
    regimenFiscal: {
        type: String,
        required: [true, "Por favor ingresa el régimen fiscal de la persona moral"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("PersonaMoral", personaMoralSchema);
