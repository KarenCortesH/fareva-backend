'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Inventario extends Model {
		static associate(models) {
			Inventario.hasMany(models.RegistroInventario, {
				foreignKey: 'id_inventario',
				as: 'registros',
				onDelete: 'CASCADE'
			});
		}
	}

	Inventario.init(
		{
			id: {  // Cambio de ID_Columna a id
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Fecha: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			Material: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			Lote: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			Platos_Teoricos: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Resolucion: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			Factor_Tailing: {
				type: DataTypes.FLOAT, // Mantener FLOAT, pero DECIMAL si necesita precisión
				allowNull: true,
			},
			N_Iny_Total: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Lavado_Tiempo: { // Era BOOLEAN, pero debería ser INTEGER si almacena minutos
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Cumple: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			Analista: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			Observaciones: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'Inventario',
			tableName: 'Inventarios', // Nombre correcto de la tabla en la BD
			timestamps: true, // Sequelize maneja los timestamps automáticamente
		}
	);

	return Inventario;
};
