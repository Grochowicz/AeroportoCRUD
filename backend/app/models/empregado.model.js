module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Empregado (
	// 	num_matricula SERIAL PRIMARY KEY,
	// 	nome TEXT,
	// 	endereco TEXT,
	// 	telefone VARCHAR(15),
	// 	salario NUMERIC(10,2)
	// );
	const Tabela = sequelize.define("empregado", {
		nome: {
			type: Sequelize.TEXT
		},
		endereco: {
			type: Sequelize.TEXT
		},
		telefone: {
			type: Sequelize.STRING
		},
		salario: {
			type: Sequelize.NUMERIC(10,2)
		}
	});

	return Tabela;
};
