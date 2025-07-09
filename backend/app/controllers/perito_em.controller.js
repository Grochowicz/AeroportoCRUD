const db = require("../models");
const Tabela = db.perito_em;
const Op = db.Sequelize.Op;

// Cria perito_em 
exports.create = (req, res) => {
  // Valida request
  if (!req.body.num_anac) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const perito_em = {
    modeloId: req.body.modeloId,
    tecnicoId: req.body.tecnicoId
  };

  // Salva no BD
  Tabela.create(perito_em)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando perito_em."
      });
    });
};

// Select todos com filtros opcionais
exports.findAll = (req, res) => {
  const tecnicoId = req.query.tecnicoId;
  const modeloId = req.query.modeloId;
  
  var condition = {};
  
  if (tecnicoId) {
    condition.tecnicoId = tecnicoId;
  }
  
  if (modeloId) {
    condition.modeloId = modeloId;
  }

  Tabela.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando perito_em."
      });
    });
};

// Acha um modelo por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tabela.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não encontrado perito_em com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando perito_em com id=" + id
      });
    });
};

// Atualiza perito_em por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "perito_em atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar perito_em com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando perito_em com id=" + id
      });
    });
};

// Deleta modelo por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tabela.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "perito_em deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar perito_em com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando perito_em com id=" + id
      });
    });
};

// Deleta todos os modelos
exports.deleteAll = (req, res) => {
  Tabela.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} perito_em deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os perito_em."
      });
    });
};

