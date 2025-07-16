
import express from "express";
import { PrismaClient } from '@prisma/client'; // Importa PrismaClient
import configurarRecetasRoutes from "./src/routes/recetas.js"; // Importa las rutas de recetas (cambiado a ES Module)

const app = express();
const prisma = new PrismaClient(); // Inicializa el cliente Prisma

// Define el puerto en el que el servidor escuchará.
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API de Recetas con Prisma" });
});

// Cargar rutas para la entidad 'recetas', pasando la instancia de Prisma
// Esto permite que tus controladores accedan a la instancia de Prisma
app.use('/recetas', configurarRecetasRoutes(prisma));


// Captura cualquier error no manejado en las rutas y envía una respuesta de error
app.use((err, req, res, next) => {
  console.error(err.stack); // Imprime el stack del error en la consola del servidor
  res.status(500).send('¡Algo salió mal en el servidor!'); // Envía una respuesta de error genérica
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Manejo de la desconexión de Prisma al cerrar la aplicación
// Asegura que la conexión a la base de datos se cierre limpiamente
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
