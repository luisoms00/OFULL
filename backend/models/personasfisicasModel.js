const mongoose = require("mongoose");

const personaFisicaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingresa el nombre completo de la persona física"]
    },
    rfc: {
        type: String,
        required: [true, "Por favor ingresa el RFC de la persona física"],
        unique: true
    },
    curp: {
        type: String,
        required: [true, "Por favor ingresa la CURP de la persona física"],
        unique: true
    },
    direccion: {
        type: String,
        required: [true, "Por favor ingresa la dirección de la persona física"]
    },
    regimenFiscal: {
        type: String,
        required: [true, "Por favor ingresa el régimen fiscal (por ejemplo: RESICO, General)"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("PersonaFisica", personaFisicaSchema);
