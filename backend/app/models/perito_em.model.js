module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Perito_em(
	// 	tecnico_perito INTEGER,
	// 	modelo_especialidade INTEGER,
	// 	PRIMARY KEY(tecnico_perito, modelo_especialidade),
	// 	FOREIGN KEY(tecnico_perito) REFERENCES Tecnico(num_matricula),
	// 	FOREIGN KEY(modelo_especialidade) REFERENCES Modelo_de_aviao(cod_modelo)
	// );
	const Tabela = sequelize.define("perito_em", {
	});

	return Tabela;
};
