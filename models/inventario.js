'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Inventario extends Model {
		static associate(models) {
			// Un inventario tiene muchos registros en la tabla RegistroInventario
			Inventario.hasMany(models.RegistroInventario, { foreignKey: 'id_inventario' });
		}
	}

	Inventario.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			producto: {
				type: DataTypes.STRING(255), // Coincide con VARCHAR(255) en la BD
				allowNull: true,
			},
			lote: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			cantidad: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			estado: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			fecha_registro: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: 'createdAt', // Mapeo para que coincida con el nombre de la columna
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: 'updatedAt', // Mapeo para que coincida con el nombre de la columna
			},
		},
		{
			sequelize,
			modelName: 'Inventario',
			tableName: 'Inventarios', // Nombre exacto de la tabla en PostgreSQL
			timestamps: true, // Sequelize manejará los campos createdAt y updatedAt
		}
	);

	return Inventario;
};
