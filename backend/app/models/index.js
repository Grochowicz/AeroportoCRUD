const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    freezeTableName: true,
  },
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.empregados = require("./empregado.model.js")(sequelize, Sequelize);

db.tecnicos = require("./tecnico.model.js")(sequelize, Sequelize);
db.empregados.hasMany(db.tecnicos, { as: "tecnicos" });
db.tecnicos.belongsTo(db.empregados, {
  foreignKey: "empregadoId",
  as: "empregado"
});

db.controladores = require("./controlador.model.js")(sequelize, Sequelize);
db.empregados.hasMany(db.controladores, { as: "controladores" });
db.controladores.belongsTo(db.empregados, {
  foreignKey: "empregadoId",
  as: "empregado"
});

db.modelos = require("./modelo.model.js")(sequelize, Sequelize);
db.avioes = require("./aviao.model.js")(sequelize, Sequelize);

db.modelos.hasMany(db.avioes, { as: "avioes" });
db.avioes.belongsTo(db.modelos, {
  foreignKey: "modeloId",
  as: "modelo"
});

db.testes = require("./teste.model.js")(sequelize, Sequelize);
db.avioes.hasMany(db.testes,  { foreignKey: "aviaoId",   as: "testes" });
db.testes.belongsTo(db.avioes, { foreignKey: "aviaoId",   as: "aviao"  });

db.tecnicos.hasMany(db.testes,  { foreignKey: "tecnicoId", as: "testes" });
db.testes.belongsTo(db.tecnicos,{ foreignKey: "tecnicoId", as: "tecnico" });

module.exports = db;
