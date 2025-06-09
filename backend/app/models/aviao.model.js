module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Aviao (
	// 	num_registro SERIAL PRIMARY KEY,
	// 	modelo INTEGER,
	// 	FOREIGN KEY (modelo) REFERENCES Modelo_de_aviao(cod_modelo)
	// );
	const Tabela = sequelize.define("aviao", {
	});

	return Tabela;
};
