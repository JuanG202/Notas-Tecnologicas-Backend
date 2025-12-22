const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  completada: { type: Boolean, default: false },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: Date
});

module.exports = mongoose.model("Tarea", TareaSchema);
