const db = require("../models");
const Modelo = db.modelos;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const modelo = {
    nome: req.body.nome,
	capacidade: req.body.capacidade,
	peso: req.body.peso
  };

  // Save in the database
  Modelo.create(modelo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando Modelo."
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Modelo.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando modelos."
      });
    });
};

//Acha um modelo por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Modelo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não encontrado modelo com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando modelo com id=" + id
      });
    });
};

//Atualiza modelo por id
exports.update = (req, res) => {
  const id = req.params.id;

  Modelo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Modelo atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar modelo com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando modelo com id=" + id
      });
    });
};

// Deleta modelo por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Modelo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Modelo deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar modelo com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando modelo com id=" + id
      });
    });
};

//Deleta todos os modelos
exports.deleteAll = (req, res) => {
  Modelo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} modelos deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os modelos."
      });
    });
};

