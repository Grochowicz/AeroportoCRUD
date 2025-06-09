module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Modelo_de_aviao (
	// 	cod_modelo SERIAL PRIMARY KEY,
	// 	nome TEXT,
	// 	capacidade INTEGER,
	// 	peso NUMERIC(10,2)
	// );
	const Tabela = sequelize.define("modelo", {
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

	return Tabela;
};
