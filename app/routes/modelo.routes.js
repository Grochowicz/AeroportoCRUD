module.exports = app => {
  const modelos = require("../controllers/modelo.controller.js");

  var router = require("express").Router();

  router.post("/", modelos.create);

  router.get("/", modelos.findAll);

  router.get("/:id", modelos.findOne);

  router.put("/:id", modelos.update);

  router.delete("/:id", modelos.delete);

  router.delete("/", modelos.deleteAll);

  app.use('/api/modelos', router);
};
