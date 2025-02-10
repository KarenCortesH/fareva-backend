const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexi�n a la base de datos exitosa.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();
