module.exports = (sequelize, Sequelize) =>{
	// CREATE TABLE Demanda (
	// 	num_matricula SERIAL PRIMARY KEY,
	// 	inicio INTEGER, 
	// 	fim INTEGER,
	// 	nivel INTEGER,
	// 	destino: TEXT, 
	// 	valor: INTEGER
	// );
	const Tabela = sequelize.define("demanda", {
        inicio: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        fim: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        nivel: {
            type: Sequelize.INTEGER
        }, 
        destino: {
            type: Sequelize.TEXT
        },
        valor: {
            type: Sequelize.INTEGER
        }
	});

	return Tabela;
};