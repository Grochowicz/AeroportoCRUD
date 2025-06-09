module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Teste(
	// 	num_anac INTEGER PRIMARY KEY,
	// 	num_aviao INTEGER,
	// 	data DATE,
	// 	duracao_horas INTEGER,
	// 	resultado TEXT,
	// 	supervisor_tecnico INTEGER,
	// 	FOREIGN KEY(num_aviao) REFERENCES Aviao(num_registro),
	// 	FOREIGN KEY(supervisor_tecnico) REFERENCES Tecnico(num_matricula)
	// );
	const Tabela = sequelize.define("teste", {
		num_anac: {
			type: Sequelize.INTEGER
		},
		data: {
			type: Sequelize.DATE
		},
		duracao_horas: {
			type: Sequelize.INTEGER
		},
		resultado: {
			type: Sequelize.TEXT
		}
	});

	return Tabela;
};
