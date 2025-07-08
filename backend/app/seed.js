const db = require("./models");

async function seed() {
  await db.sequelize.sync({ force: true }); // Limpa e recria as tabelas

  // Modelos de Avião
  const modelos = await db.modelos.bulkCreate([
    { nome: "Boeing 737", capacidade: 5 },
    { nome: "Airbus A320", capacidade: 4 },
    { nome: "Embraer 190", capacidade: 3 },
    { nome: "Cessna 208", capacidade: 2 },
    { nome: "ATR 72", capacidade: 6 }
  ]);

  // Empregados
  const empregados = await db.empregados.bulkCreate([
    { nome: "João Silva", endereco: "Rua A, 123", telefone: "11999999999", salario: 5000 },
    { nome: "Maria Souza", endereco: "Rua B, 456", telefone: "11888888888", salario: 6000 },
    { nome: "Carlos Lima", endereco: "Rua C, 789", telefone: "11777777777", salario: 5500 }
  ]);

  // Aviões
  const avioes = await db.avioes.bulkCreate([
    { modeloId: modelos[0].id },
    { modeloId: modelos[0].id },
    { modeloId: modelos[1].id },
    { modeloId: modelos[1].id },
    { modeloId: modelos[2].id },
    { modeloId: modelos[2].id },
    { modeloId: modelos[3].id },
    { modeloId: modelos[4].id }
  ]);

  // Demandas
  await db.demandas.bulkCreate([
    { inicio: "13:00", fim: "14:00", nivel: 3, destino: "São Paulo", valor: 1000 },
    { inicio: "13:30", fim: "14:30", nivel: 2, destino: "Rio de Janeiro", valor: 800 },
    { inicio: "14:15", fim: "15:00", nivel: 5, destino: "Brasília", valor: 1200 },
    { inicio: "15:00", fim: "16:00", nivel: 4, destino: "Curitiba", valor: 900 },
    { inicio: "16:00", fim: "17:00", nivel: 6, destino: "Porto Alegre", valor: 1500 },
    { inicio: "13:45", fim: "14:30", nivel: 2, destino: "Campinas", valor: 700 },
    { inicio: "14:30", fim: "15:30", nivel: 3, destino: "Salvador", valor: 950 },
    { inicio: "15:30", fim: "16:30", nivel: 5, destino: "Recife", valor: 1100 },
    { inicio: "16:30", fim: "17:30", nivel: 4, destino: "Fortaleza", valor: 1050 },
    { inicio: "17:00", fim: "18:00", nivel: 2, destino: "Manaus", valor: 850 }
  ]);

  // Técnicos (associados a empregados)
  const tecnicos = await db.tecnicos.bulkCreate([
    { salario_base: 3000, empregadoId: empregados[0].id },
    { salario_base: 3200, empregadoId: empregados[1].id }
  ]);

  // Controladores (associados a empregados)
  const controladores = await db.controladores.bulkCreate([
    { ultimo_exame: new Date(), empregadoId: empregados[2].id }
  ]);

  // Testes (associados a avioes e tecnicos)
  const testes = await db.testes.bulkCreate([
    { num_anac: 101, data: new Date(), duracao_horas: 2, resultado: "Aprovado", aviaoId: avioes[0].id, tecnicoId: tecnicos[0].id },
    { num_anac: 102, data: new Date(), duracao_horas: 3, resultado: "Reprovado", aviaoId: avioes[1].id, tecnicoId: tecnicos[1].id }
  ]);

  // Perito_em (associados a tecnicos e modelos)
  await db.perito_em.bulkCreate([
    { tecnicoId: empregados[0].id, modeloId: modelos[0].id },
    { tecnicoId: empregados[1].id, modeloId: modelos[1].id }
  ]);

  console.log("Seed concluído!");
  process.exit();
}

seed();
