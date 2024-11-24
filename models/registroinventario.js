'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class RegistroInventario extends Model {
		static associate(models) {
			// Relaci�n con Inventario
			RegistroInventario.belongsTo(models.Inventario, {
				foreignKey: 'id_inventario',
				as: 'inventario', // Alias para la relaci�n
				onDelete: 'CASCADE', // Si se elimina un inventario, sus registros se eliminan
			});

			// Relaci�n con Usuario
			RegistroInventario.belongsTo(models.Usuario, {
				foreignKey: 'id_usuario',
				as: 'usuario', // Alias para la relaci�n
				onDelete: 'SET NULL', // Si el usuario es eliminado, el campo se establece en NULL
			});
		}
	}

	RegistroInventario.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			id_inventario: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			id_usuario: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			fecha: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			observaciones: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: 'createdAt',
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				field: 'updatedAt',
			},
		},
		{
			sequelize,
			modelName: 'RegistroInventario',
			tableName: 'RegistroInventarios', // Coincide con la tabla en la BD
			timestamps: true, // Sequelize manejar� createdAt y updatedAt
		}
	);

	return RegistroInventario;
};
