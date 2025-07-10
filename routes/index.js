import express from "express";
import configurarRutas from "./routes/index.js";

const app = express();
const port = 3000;

// Middleware para usar JSON
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API de TiendaNode" });
});

// Cargar rutas desde archivo central
configurarRutas(app);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});