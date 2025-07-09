const db = require("../models");
const Tabela = db.tecnicos;
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

  const tecnico = {
    empregadoId: req.body.empregadoId,
    salario_base: req.body.salario_base
  };

  // Salva no BD
  Tabela.create(tecnico)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando técnico."
      });
    });
};

// Select todos com filtros opcionais
exports.findAll = (req, res) => {
  const empregadoId = req.query.empregadoId;
  var condition = empregadoId ? { empregadoId: empregadoId } : null;

  Tabela.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando técnicos."
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
          message: `Não encontrado técnico com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando técnico com id=" + id
      });
    });
};

// Atualiza técnico por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Técnico atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar técnico com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando técnico com id=" + id
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
          message: "Técnico deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar técnico com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando técnico com id=" + id
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
      res.send({ message: `${nums} técnicos deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os técnicos."
      });
    });
};

