const db = require("../models");
const Tabela = db.controladores;
const Op = db.Sequelize.Op;

// Cria tecnico 
exports.create = (req, res) => {
  // Valida request
  if (!req.body.empregadoId) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const controlador = {
    empregadoId: req.body.empregadoId,
    ultimo_exame: req.body.ultimo_exame
  };

  // Salva no BD
  Tabela.create(controlador)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando controlador."
      });
    });
};

// Select todos
exports.findAll = (req, res) => {
  // const empregadoId = req.query.empregadoId;
  // var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Tabela.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando controladores."
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
          message: `Não encontrado controlador com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando controlador com id=" + id
      });
    });
};

// Atualiza controlador por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "controlador atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar controlador com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando controlador com id=" + id
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
          message: "controlador deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar controlador com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando controlador com id=" + id
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
      res.send({ message: `${nums} controladores deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os controladores."
      });
    });
};

