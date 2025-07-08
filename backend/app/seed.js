const db = require("./models");

async function seed() {
  await db.sequelize.sync({ force: true }); // Limpa e recria as tabelas

  // Modelos de Avião
  const modelos = await db.modelos.bulkCreate([
    { nome: "Boeing 737", capacidade: 5 },
    { nome: "Airbus A320", capacidade: 4 },
    { nome: "Embraer 190", capacidade: 3 }
  ]);

  // Aviões
  const avioes = await db.avioes.bulkCreate([
    { modeloId: modelos[0].id },
    { modeloId: modelos[1].id },
    { modeloId: modelos[2].id }
  ]);

  // Demandas
  await db.demandas.bulkCreate([
    { inicio: 60, fim: 120, nivel: 3, destino: "São Paulo", valor: 1000 },
    { inicio: 90, fim: 150, nivel: 2, destino: "Rio de Janeiro", valor: 800 },
    { inicio: 130, fim: 200, nivel: 5, destino: "Brasília", valor: 1200 }
  ]);

  console.log("Seed concluído!");
  process.exit();
}

seed();
