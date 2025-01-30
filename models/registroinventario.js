'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class RegistroInventario extends Model {
		static associate(models) {
			RegistroInventario.belongsTo(models.Inventario, {
				foreignKey: 'id_inventario',
				as: 'inventario',
				onDelete: 'CASCADE',
			});

			RegistroInventario.belongsTo(models.Usuario, {
				foreignKey: 'id_usuario',
				as: 'usuario',
				onDelete: 'SET NULL',
			});
		}
	}

	RegistroInventario.init(
		{
			id: {  // Cambio de ID_Columna a id
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			id_inventario: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Inventarios',
					key: 'id',
				},
			},
			id_usuario: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'Usuarios',
					key: 'id',
				},
			},
			fecha: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			observaciones: {
				type: DataTypes.TEXT,
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
			modelName: 'RegistroInventario',
			tableName: 'RegistroInventarios',
			timestamps: true,
		}
	);

	return RegistroInventario;
};
