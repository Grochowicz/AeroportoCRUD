const db = require("../models");
const Tabela = db.empregados;
const Op = db.Sequelize.Op;

// Cria empregado 
exports.create = (req, res) => {
  // Valida request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const modelo = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    salario: req.body.salario
  };

  // Salva no BD
  Tabela.create(modelo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando empregado."
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
          err.message || "Erro recuperando empregados."
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
          message: `Não encontrado empregado com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando empregado com id=" + id
      });
    });
};

// Atualiza empregado por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Empregado atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar empregado com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando empregado com id=" + id
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
          message: "Empregado deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar empregado com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando empregado com id=" + id
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
      res.send({ message: `${nums} empregados deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os empregados."
      });
    });
};

