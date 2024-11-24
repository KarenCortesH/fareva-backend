'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		static associate(models) {
			Usuario.hasMany(models.RegistroInventario, { foreignKey: 'id_usuario' });
		}
	}

	Usuario.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Usuario',
			tableName: 'Usuarios', // Coincide exactamente con el nombre de la tabla
			timestamps: true,
		}
	);

	return Usuario;
};
