const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

// Importaci�n de modelos
const Usuario = require('./usuario')(sequelize, DataTypes);
const Inventario = require('./inventario')(sequelize, DataTypes);
const RegistroInventario = require('./registroinventario')(sequelize, DataTypes);

// Asociaciones (aseg�rate de que todos los modelos ya est�n definidos)
Usuario.associate({ RegistroInventario });
Inventario.associate({ RegistroInventario });
RegistroInventario.associate({ Usuario, Inventario });

module.exports = { sequelize, Usuario, Inventario, RegistroInventario };
