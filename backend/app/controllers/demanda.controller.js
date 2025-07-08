const db = require("../models");
const Tabela = db.demandas; // nome exportado no model
const Op = db.Sequelize.Op;

// Cria uma nova demanda
exports.create = (req, res) => {
  // Validação básica
  if (!req.body.destino) {
    res.status(400).send({
      message: "Conteúdo vazio! 'destino' é obrigatório."
    });
    return;
  }

  // Monta o objeto
  const demanda = {
    inicio: req.body.inicio,
    fim: req.body.fim,
    nivel: req.body.nivel,
    destino: req.body.destino, 
    valor: req.body.valor
  };

  // Salva no banco
  Tabela.create(demanda)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro criando a demanda."
      });
    });
};

// Recupera todas as demandas (pode filtrar por destino)
exports.findAll = (req, res) => {
  const destino = req.query.destino;
  const condition = destino ? { destino: { [Op.iLike]: `%${destino}%` } } : null;

  Tabela.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro recuperando as demandas."
      });
    });
};

// Recupera uma única demanda por ID (num_matricula)
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tabela.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Demanda com id=${id} não encontrada.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar a demanda com id=" + id
      });
    });
};

// Atualiza uma demanda por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Tabela.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Demanda atualizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar a demanda com id=${id}. Verifique se ela existe ou se o corpo da requisição está vazio.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar a demanda com id=" + id
      });
    });
};

// Remove uma demanda por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Tabela.destroy({
    where: { num_matricula: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Demanda deletada com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar a demanda com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao deletar a demanda com id=" + id
      });
    });
};

// Remove todas as demandas
exports.deleteAll = (req, res) => {
  Tabela.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} demandas deletadas com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro ao deletar todas as demandas."
      });
    });
};
