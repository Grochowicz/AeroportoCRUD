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


db.modelos = require("./modelo.model.js")(sequelize, Sequelize);
db.avioes = require("./aviao.model.js")(sequelize, Sequelize);

db.modelos.hasMany(db.avioes, { as: "avioes" });
db.avioes.belongsTo(db.modelos, {
  foreignKey: "modeloId",
  as: "modelo"
});


module.exports = db;
