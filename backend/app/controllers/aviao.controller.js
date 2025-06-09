const db = require("../models");
const Tabela = db.avioes;
const Op = db.Sequelize.Op;

// Cria avião 
exports.create = (req, res) => {
  // Valida request
  if (!req.body.modeloId) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const aviao = {
    modeloId: req.body.modeloId
  };

  // Salva no BD
  Tabela.create(aviao)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando avião."
      });
    });
};

// Select todos
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Tabela.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando aviões."
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
          message: `Não encontrado avião com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando avião com id=" + id
      });
    });
};

// Atualiza avião por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Avião atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar avião com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando avião com id=" + id
      });
    });
};

// Deleta avião por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tabela.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Avião deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar avião com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando avião com id=" + id
      });
    });
};

// Deleta todos os aviões 
exports.deleteAll = (req, res) => {
  Tabela.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} aviões deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os aviões."
      });
    });
};

