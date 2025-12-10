const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const rutasTareas = require("./routes/tareas");

const app = express(); // <-- Primero se inicializa app

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta
app.use("/tareas", rutasTareas); // <-- Aquí sí debe ir

// Conexión MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch(err => console.log("Error de conexión:", err));

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
