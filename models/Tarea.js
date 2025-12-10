const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: "" },
  tecnico: { type: String, default: "" },
  completada: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
});

module.exports = mongoose.model("Tarea", TareaSchema);
