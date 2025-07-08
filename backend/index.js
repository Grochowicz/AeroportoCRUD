const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

require("./app/routes/empregado.routes")(app);
require("./app/routes/tecnico.routes")(app);
require("./app/routes/controlador.routes")(app);

require("./app/routes/modelo.routes")(app);
require("./app/routes/aviao.routes")(app);

require("./app/routes/teste.routes")(app);

require("./app/routes/perito_em.routes")(app);

require("./app/routes/demanda.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();
