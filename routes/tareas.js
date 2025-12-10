const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// GET todas las tareas
router.get("/", async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

// POST crear tarea
router.post("/", async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

// PUT actualizar
router.put("/:id", async (req, res) => {
  const tareaActualizada = await Tarea.findByIdAndUpdate(
    req.params.id,
    { ...req.body, fechaActualizacion: new Date() },
    { new: true }
  );
  res.json(tareaActualizada);
});

// DELETE eliminar
router.delete("/:id", async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Tarea eliminada" });
});

// PATCH cambiar estado
router.patch("/:id/toggle", async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);
  tarea.completada = !tarea.completada;
  tarea.fechaActualizacion = new Date();
  await tarea.save();
  res.json(tarea);
});

module.exports = router;
