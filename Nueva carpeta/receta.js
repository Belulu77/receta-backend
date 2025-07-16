
// Función auxiliar para parsear ingredientes si existen
const parseIngredientes = (receta) => {
  if (receta && receta.ingredientes) {
    try {
      // Intenta parsear la cadena JSON a un array
      receta.ingredientes = JSON.parse(receta.ingredientes);
    } catch (e) {
      // Si falla el parseo (no es un JSON válido), lo deja como está o lo maneja
      console.warn("No se pudo parsear los ingredientes como JSON:", receta.ingredientes);
      receta.ingredientes = []; // O maneja el error de otra forma, por ejemplo, un array vacío
    }
  }
  return receta;
};

// GET /recetas
// Obtiene todas las recetas, con opción de filtrar por dificultad o nombre.
export const getAllRecetas = async (req, res, prisma) => {
  try {
    const { dificultad, nombre } = req.query;
    let where = {};

    if (dificultad) {
      where.dificultad = {
        contains: dificultad,
        mode: 'insensitive'
      };
    }

    if (nombre) {
      where.nombre = {
        contains: nombre,
        mode: 'insensitive'
      };
    }

    const recetas = await prisma.receta.findMany({
      where: where
    });

    // Deserializa los ingredientes para cada receta antes de enviarlos
    const recetasParsed = recetas.map(parseIngredientes);
    res.status(200).json(recetasParsed);
  } catch (error) {
    console.error('Error al obtener todas las recetas:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener recetas.' });
  }
};

// GET /recetas/:id
// Obtiene una sola receta por su ID.
export const getRecetaById = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    let receta = await prisma.receta.findUnique({
      where: { id: id },
    });

    if (receta) {
      // Deserializa los ingredientes antes de enviar la receta
      receta = parseIngredientes(receta);
      res.status(200).json(receta);
    } else {
      res.status(404).json({ message: 'Receta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener receta por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener receta.' });
  }
};

// POST /recetas
// Crea una nueva receta.
export const createReceta = async (req, res, prisma) => {
  try {
    const { nombre, ingredientes, instrucciones, tiempoPreparacion, dificultad } = req.body;

    if (!nombre || !ingredientes || !instrucciones || !tiempoPreparacion || !dificultad) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: nombre, ingredientes, instrucciones, tiempoPreparacion, dificultad.' });
    }

    // Serializa los ingredientes a una cadena JSON antes de guardarlos
    const ingredientesString = JSON.stringify(ingredientes);

    const newReceta = await prisma.receta.create({
      data: {
        nombre,
        ingredientes: ingredientesString, // Guarda como string JSON
        instrucciones,
        tiempoPreparacion: parseInt(tiempoPreparacion, 10),
        dificultad,
      },
    });

    // Deserializa los ingredientes para la respuesta
    const newRecetaParsed = parseIngredientes(newReceta);
    res.status(201).json(newRecetaParsed);
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear receta.' });
  }
};

// PUT /recetas/:id
// Actualiza una receta existente por su ID.
export const updateReceta = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    const { nombre, ingredientes, instrucciones, tiempoPreparacion, dificultad } = req.body;

    let dataToUpdate = {
      nombre,
      instrucciones,
      tiempoPreparacion: tiempoPreparacion ? parseInt(tiempoPreparacion, 10) : undefined,
      dificultad,
    };

    // Serializa los ingredientes si se proporcionan para la actualización
    if (ingredientes !== undefined) {
      dataToUpdate.ingredientes = JSON.stringify(ingredientes);
    }

    const updatedReceta = await prisma.receta.update({
      where: { id: id },
      data: dataToUpdate,
    });

    // Deserializa los ingredientes para la respuesta
    const updatedRecetaParsed = parseIngredientes(updatedReceta);
    res.status(200).json(updatedRecetaParsed);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Receta no encontrada para actualizar.' });
    }
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar receta.' });
  }
};

// DELETE /recetas/:id
// Borra una receta por su ID.
export const deleteReceta = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    await prisma.receta.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Receta no encontrada para eliminar.' });
    }
    console.error('Error al eliminar receta:', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar receta.' });
  }
};