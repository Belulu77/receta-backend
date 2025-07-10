import express from "express";
const router = express.Router();

// GET todos los productos
router.get("/", (req, res) => {
  res.json({ mensaje: "Esta es la ruta GET de mi entidad productos" });
});

// GET producto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta GET de mi entidad productos con el ID ${id}` });
});

// POST producto
router.post("/", (req, res) => {
  res.json({ mensaje: "Esta es la ruta POST de mi entidad productos" });
});

// PUT producto por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta PUT de mi entidad productos con el ID ${id}` });
});

// DELETE producto por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Esta es la ruta DELETE de mi entidad productos con el ID ${id}` });
});

export default router;