const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");
const auth = require("../middleware/auth");

/* =========================
   GET - TODAS LAS TAREAS
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const tareas = await Tarea.find().populate("usuario", "nombre email");
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
});

/* =========================
   POST - CREAR TAREA
========================= */
router.post("/", auth, async (req, res) => {
  try {
    const nuevaTarea = new Tarea({
      ...req.body,
      usuario: req.usuario.id
    });

    await nuevaTarea.save();
    res.json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear tarea" });
  }
});

/* =========================
   PUT - ACTUALIZAR TAREA
========================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar tarea" });
  }
});

/* =========================
   DELETE - ELIMINAR TAREA
========================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar tarea" });
  }
});

/* =========================
   PATCH - TOGGLE COMPLETADA
========================= */
router.patch("/:id/toggle", auth, async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    tarea.completada = !tarea.completada;
    tarea.fechaActualizacion = new Date();
    await tarea.save();

    res.json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cambiar estado" });
  }
});

module.exports = router;
