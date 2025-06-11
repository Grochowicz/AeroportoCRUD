const db = require("../models");
const Tabela = db.testes;
const Op = db.Sequelize.Op;

// Cria teste 
exports.create = (req, res) => {
  // Valida request
  if (!req.body.num_anac) {
    res.status(400).send({
      message: "Conteúdo vazio!"
    });
    return;
  }

  const teste = {
    num_anac: req.body.num_anac,
    data: req.body.data,
    duracao_horas: req.body.duracao_horas,
    resultado: req.body.resultado,
    aviaoId: req.body.aviaoId,
    tecnicoId: req.body.tecnicoId
  };

  // Salva no BD
  Tabela.create(teste)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro criando teste."
      });
    });
};

// Select todos por num_anac
exports.findAll = (req, res) => {
  const nome = req.query.num_anac;
  var condition = nome ? { num_anac: { [Op.eq]: parseInt(nome) } } : null;

  Tabela.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro recuperando testes."
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
          message: `Não encontrado teste com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando teste com id=" + id
      });
    });
};

// Atualiza teste por id
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "teste atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar teste com id=${id}. Pode não ter sido encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro atualizando teste com id=" + id
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
          message: "teste deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar teste com id=${id}. Pode não ter sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro deletando teste com id=" + id
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
      res.send({ message: `${nums} testes deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro removendo todos os testes."
      });
    });
};

