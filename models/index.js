const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	logging: console.log,
});

// Cargar los modelos
const Usuario = require('./usuario')(sequelize, DataTypes);
const Inventario = require('./registroinventario')(sequelize, DataTypes);
const RegistroInventario = require('./inventario')(sequelize, DataTypes);

// Llamar a las asociaciones
Usuario.associate({ RegistroInventario });
Inventario.associate({ RegistroInventario });
RegistroInventario.associate({ Usuario, Inventario });

module.exports = { sequelize, Usuario, Inventario, RegistroInventario };
