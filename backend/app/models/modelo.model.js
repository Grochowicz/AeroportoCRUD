module.exports = (sequelize, Sequelize) =>{
	const Modelo = sequelize.define("modelo", {
		nome: {
			type: Sequelize.TEXT
		},
		capacidade: {
			type: Sequelize.INTEGER
		},
		peso: {
			type: Sequelize.NUMERIC(10,2)
		}
	});

	return Modelo;
};
