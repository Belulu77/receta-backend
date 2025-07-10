import express from "express";
const router = express.Router();

// GET todas las categorías
router.get("/", (req, res) => {
  res.json({ mensaje: "Esta es la ruta GET de mi entidad categorias" });
});

// GET categoría por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta GET de mi entidad categorias con el ID ${id}` });
});

// POST categoría
router.post("/", (req, res) => {
  res.json({ mensaje: "Esta es la ruta POST de mi entidad categorias" });
});

// PUT categoría por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta PUT de mi entidad categorias con el ID ${id}` });
});

// DELETE categoría por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta DELETE de mi entidad categorias con el ID ${id}` });
});

export default router;