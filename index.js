import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json()); 




app.get('/recetas', (req, res) => {
  res.json({ mensaje: 'Esta es la ruta GET de mi entidad' });
});


app.post('/recetas', (req, res) => {
  res.json({ mensaje: 'Esta es la ruta POST de mi entidad' });
});


app.put('/recetas/:id', (req, res) => {
  res.json({ mensaje: 'Esta es la ruta PUT de mi entidad' });
});


app.delete('/recetas/:id', (req, res) => {
  res.json({ mensaje: 'Esta es la ruta DELETE de mi entidad' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
