"use strict";
const express = require("express");
const { Inventario } = require("../models"); // Asegúrate de que el modelo está importado correctamente
const router = express.Router();

// ?? Listar todos los inventarios
router.get("/", async (req, res) => {
  try {
    const inventarios = await Inventario.findAll();
    res.status(200).json(inventarios);
  } catch (error) {
    console.error("Error al listar inventarios:", error);
    res.status(500).json({ error: "Error al listar inventarios" });
  }
});

// ?? Obtener un inventario por ID
router.get("/:id", async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (!inventario) {
      return res.status(404).json({ error: "Inventario no encontrado" });
    }
    res.status(200).json(inventario);
  } catch (error) {
    console.error("Error al obtener inventario:", error);
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});

// ?? Crear un inventario
router.post("/", async (req, res) => {
  try {
    const { producto, lote, cantidad, estado } = req.body;

    if (!producto || !lote || !cantidad || !estado) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoInventario = await Inventario.create({
      producto,
      lote,
      cantidad,
      estado,
    });

    res.status(201).json(nuevoInventario);
  } catch (error) {
    console.error("Error al crear inventario:", error);
    res.status(500).json({ error: "Error al crear inventario" });
  }
});

// ?? Actualizar un inventario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { producto, lote, cantidad, estado } = req.body;

    const inventario = await Inventario.findByPk(id);
    if (!inventario) {
      return res.status(404).json({ error: "Inventario no encontrado" });
    }

    const inventarioActualizado = await inventario.update({ producto, lote, cantidad, estado });
    res.status(200).json(inventarioActualizado);
  } catch (error) {
    console.error("Error al actualizar inventario:", error);
    res.status(500).json({ error: "Error al actualizar inventario" });
  }
});

// ?? Eliminar un inventario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const inventario = await Inventario.findByPk(id);
    if (!inventario) {
      return res.status(404).json({ error: "Inventario no encontrado" });
    }

    await inventario.destroy();
    res.status(200).json({ message: "Inventario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar inventario:", error);
    res.status(500).json({ error: "Error al eliminar inventario" });
  }
});

module.exports = router;
