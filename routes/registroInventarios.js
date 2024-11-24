'use strict';
const express = require('express');
const { RegistroInventario, Inventario, Usuario } = require('../models'); // Asegúrate de tener los modelos configurados correctamente
const router = express.Router();

// Listar registros por inventario
router.get('/', async (req, res) => {
  try {
    const { inventarioId } = req.query;
    if (!inventarioId) {
      return res.status(400).json({ error: 'El ID del inventario es obligatorio' });
    }

    const registros = await RegistroInventario.findAll({
      where: { id_inventario: inventarioId },
      include: [
        { model: Inventario },
        { model: Usuario }
      ],
    });

    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al listar registros:', error);
    res.status(500).json({ error: 'Error al listar registros' });
  }
});

// Crear un registro
router.post('/', async (req, res) => {
  try {
    const { id_inventario, id_usuario, fecha, observaciones } = req.body;

    const nuevoRegistro = await RegistroInventario.create({
      id_inventario,
      id_usuario,
      fecha,
      observaciones,
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al crear registro:', error);
    res.status(500).json({ error: 'Error al crear registro' });
  }
});

// Actualizar un registro
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, observaciones } = req.body;

    const registro = await RegistroInventario.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    const registroActualizado = await registro.update({ fecha, observaciones });
    res.status(200).json(registroActualizado);
  } catch (error) {
    console.error('Error al actualizar registro:', error);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
});

// Eliminar un registro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await RegistroInventario.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await registro.destroy();
    res.status(200).json({ message: 'Registro eliminado' });
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
});

module.exports = router;
