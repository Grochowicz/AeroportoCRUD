module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Tecnico (
	// 	num_matricula INTEGER PRIMARY KEY,
	// 	salario_base NUMERIC(10, 2),
	// 	FOREIGN KEY(num_matricula) REFERENCES Empregado(num_matricula)
	// );
	const Tabela = sequelize.define("tecnico", {
		salario_base: {
			type: Sequelize.NUMERIC(10,2)
		}
	});

	return Tabela;
};
