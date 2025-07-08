module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Demanda (
	// 	num_matricula SERIAL PRIMARY KEY,
	// 	inicio INTEGER, 
	// 	fim INTEGER,
	// 	nivel INTEGER,
	// 	destino: TEXT, 
	// );
	const Tabela = sequelize.define("empregado", {
        inicio: {
            type: Sequelize.INTEGER
        }, 
        fim: {
            type: Sequelize.INTEGER
        }, 
        nivel: {
            type: Sequelize.INTEGER
        }, 
        destino: {
            type: Sequelize.TEXT
        }
	});

	return Tabela;
};