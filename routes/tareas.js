const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");
const auth = require("../middleware/auth");

// GET tareas del usuario
router.get("/", auth, async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});


// POST crear tarea
router.post("/", auth, async (req, res) => {
  const nuevaTarea = new Tarea({
    ...req.body,
    usuario: req.usuario.id
  });
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

// PUT actualizar
router.put("/:id", auth, async (req, res) => {
  const tarea = await Tarea.findOneAndUpdate(
    { _id: req.params.id, usuario: req.usuario.id },
    { ...req.body, fechaActualizacion: new Date() },
    { new: true }
  );
  res.json(tarea);
});

// DELETE eliminar
router.delete("/:id", auth, async (req, res) => {
  await Tarea.findOneAndDelete({
    _id: req.params.id,
    usuario: req.usuario.id
  });
  res.json({ mensaje: "Tarea eliminada" });
});

// PATCH toggle
router.patch("/:id/toggle", auth, async (req, res) => {
  const tarea = await Tarea.findOne({
    _id: req.params.id,
    usuario: req.usuario.id
  });

  tarea.completada = !tarea.completada;
  tarea.fechaActualizacion = new Date();
  await tarea.save();

  res.json(tarea);
});

module.exports = router;
