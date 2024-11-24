const express = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models'); // Asegúrate de que esté bien importado
const router = express.Router();

// Middleware para validar los datos de entrada
const validarUsuario = (req, res, next) => {
	console.log('Cuerpo recibido:', req.body); // Depuración
	const { username, password, role } = req.body;
	if (!username || !password || !role) {
		return res.status(400).json({ error: 'Todos los campos son obligatorios' });
	}
	next();
};
router.get('/', async (req, res) => {
	try {
		console.log('Iniciando consulta de usuarios...');
		const usuarios = await Usuario.findAll();
		console.log('Usuarios obtenidos:', usuarios);
		res.status(200).json(usuarios);
	} catch (error) {
		console.error('Error al obtener los usuarios:', error.message); 
		console.error('Stack Trace:', error.stack); // Mostrar el stack trace completo
		res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
	}
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
	try {
		const usuario = await Usuario.findByPk(req.params.id);
		if (!usuario) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		res.status(200).json(usuario);
	} catch (error) {
		console.error('Error al obtener el usuario:', error);
		res.status(500).json({ error: 'Error al obtener el usuario' });
	}
});

// Crear un usuario
router.post('/', validarUsuario, async (req, res) => {
	try {
		const { username, password, role } = req.body;

		// Encriptar la contraseña
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crear el usuario en la base de datos
		const usuario = await Usuario.create({
			username,
			password: hashedPassword,
			role,
		});

		res.status(201).json(usuario);
	} catch (error) {
		console.error('Error al crear el usuario:', error);
		res.status(500).json({ error: 'Error al crear el usuario' });
	}
});

// Actualizar un usuario
router.put('/:id', validarUsuario, async (req, res) => {
	try {
		const usuario = await Usuario.findByPk(req.params.id);
		if (!usuario) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		// Encriptar la contraseña si se actualiza
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
		}

		const updatedUsuario = await usuario.update(req.body);
		res.status(200).json(updatedUsuario);
	} catch (error) {
		console.error('Error al actualizar el usuario:', error);
		res.status(500).json({ error: 'Error al actualizar el usuario' });
	}
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
	try {
		const usuario = await Usuario.findByPk(req.params.id);
		if (!usuario) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await usuario.destroy();
		res.status(200).json({ message: 'Usuario eliminado' });
	} catch (error) {
		console.error('Error al eliminar el usuario:', error);
		res.status(500).json({ error: 'Error al eliminar el usuario' });
	}
});

module.exports = router;
