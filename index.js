const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const inventariosRoutes = require('./routes/inventarios');
const registroInventariosRoutes = require('./routes/registroInventarios');
const sequelize = require('./config/database');

// Crear la aplicación de Express
app.use(express.json());

// Habilitar CORS para todas las rutas y métodos
app.use(cors()); 
//api usuarios
app.use('/api/usuarios', usuariosRoutes);

//api Listar Inventario
app.use('/api/inventarios', inventariosRoutes);

//api Listar Inventario
app.use('/api/registros', registroInventariosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
