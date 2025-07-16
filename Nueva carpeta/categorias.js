
// GET /categorias
// Obtiene todas las categorías, con opción de filtrar por nombre.
export const getAllCategorias = async (req, res, prisma) => {
  try {
    const { nombre } = req.query; // Extrae el query parameter 'nombre'.
    let where = {};

    if (nombre) {
      where.nombre = {
        contains: nombre,
        mode: 'insensitive'
      };
    }

    const categorias = await prisma.categoria.findMany({
      where: where
    });
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener todas las categorías:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener categorías.' });
  }
};

// GET /categorias/:id
// Obtiene una sola categoría por su ID.
export const getCategoriaById = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: id },
    });

    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener categoría por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener categoría.' });
  }
};

// POST /categorias
// Crea una nueva categoría.
export const createCategoria = async (req, res, prisma) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El campo "nombre" es requerido para crear una categoría.' });
    }

    const newCategoria = await prisma.categoria.create({
      data: {
        nombre,
        descripcion,
      },
    });
    res.status(201).json(newCategoria);
  } catch (error) {
    // Manejo de error si la categoría ya existe (código P2002 de Prisma para unique constraint violation).
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Ya existe una categoría con ese nombre.' });
    }
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear categoría.' });
  }
};

// PUT /categorias/:id
// Actualiza una categoría existente por su ID.
export const updateCategoria = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const updatedCategoria = await prisma.categoria.update({
      where: { id: id },
      data: {
        nombre,
        descripcion,
      },
    });
    res.status(200).json(updatedCategoria);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Categoría no encontrada para actualizar.' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Ya existe una categoría con ese nombre.' });
    }
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar categoría.' });
  }
};

// DELETE /categorias/:id
// Borra una categoría por su ID.
export const deleteCategoria = async (req, res, prisma) => {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({
      where: { id: id },
    });
    res.status(204).send(); // No Content
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Categoría no encontrada para eliminar.' });
    }
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar categoría.' });
  }
};
