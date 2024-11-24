'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Inventarios', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			producto: {
				type: Sequelize.STRING
			},
			lote: {
				type: Sequelize.STRING
			},
			cantidad: {
				type: Sequelize.INTEGER
			},
			estado: {
				type: Sequelize.STRING
			},
			fecha_registro: {
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Inventarios');
	}
};
