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
		  id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		  },
		  producto: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  lote: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		  },
		  estado: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		},
		{
		  sequelize,
		  modelName: "Inventario",
		  tableName: "inventarios", // Asegúrate que coincida con el nombre real
		  timestamps: true, // Activa timestamps
		  underscored: true, // Generará `created_at` en vez de `createdAt`
		}
	  );
	  
	return Inventario;
};
