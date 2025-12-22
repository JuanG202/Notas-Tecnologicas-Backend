const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
   tecnico: { type: String, default: "" },
  completada: { type: Boolean, default: false },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
});

module.exports = mongoose.model("Tarea", TareaSchema);
