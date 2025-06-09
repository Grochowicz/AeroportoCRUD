module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Controlador(
	// 	num_matricula INTEGER PRIMARY KEY,
	// 	ultimo_exame DATE,
	// 	FOREIGN KEY(num_matricula) REFERENCES Empregado(num_matricula)
	// );
	const Tabela = sequelize.define("controlador", {
		ultimo_exame: {
			type: Sequelize.DATE
		}
	});

	return Tabela;
};
