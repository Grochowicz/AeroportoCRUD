const db = require("./models");

async function seed() {
  await db.sequelize.sync({ force: true }); // Limpa e recria as tabelas

  // Modelos de Avião
  const modelos = await db.modelos.bulkCreate([
    { nome: "Boeing 737", capacidade: 8 },
    { nome: "Airbus A320", capacidade: 7 },
    { nome: "Embraer 190", capacidade: 6 },
    { nome: "Cessna 208", capacidade: 3 },
    { nome: "ATR 72", capacidade: 9 },
    { nome: "Boeing 777", capacidade: 10 },
    { nome: "Airbus A350", capacidade: 9 },
    { nome: "Embraer 175", capacidade: 5 },
    { nome: "Bombardier CRJ900", capacidade: 4 },
    { nome: "Pilatus PC-12", capacidade: 2 }
  ]);

  // Empregados
  const empregados = await db.empregados.bulkCreate([
    { nome: "João Silva", endereco: "Rua A, 123", telefone: "11999999999", salario: 5000 },
    { nome: "Maria Souza", endereco: "Rua B, 456", telefone: "11888888888", salario: 6000 },
    { nome: "Carlos Lima", endereco: "Rua C, 789", telefone: "11777777777", salario: 5500 }
  ]);

  // Aviões
  const avioes = await db.avioes.bulkCreate([
    { modeloId: modelos[0].id }, // Boeing 737
    { modeloId: modelos[0].id },
    { modeloId: modelos[1].id }, // Airbus A320
    { modeloId: modelos[1].id },
    { modeloId: modelos[2].id }, // Embraer 190
    { modeloId: modelos[2].id },
    { modeloId: modelos[3].id }, // Cessna 208
    { modeloId: modelos[4].id }, // ATR 72
    { modeloId: modelos[5].id }, // Boeing 777
    { modeloId: modelos[6].id }, // Airbus A350
    { modeloId: modelos[7].id }, // Embraer 175
    { modeloId: modelos[8].id }, // Bombardier CRJ900
    { modeloId: modelos[9].id }  // Pilatus PC-12
  ]);

  // Demandas
  await db.demandas.bulkCreate([
    // Madrugada (00:00 - 06:00)
    { inicio: "00:00", fim: "02:30", nivel: 8, destino: "Buenos Aires", valor: 2800 },
    { inicio: "00:30", fim: "03:00", nivel: 9, destino: "Santiago", valor: 3200 },
    { inicio: "01:00", fim: "02:30", nivel: 6, destino: "São Paulo", valor: 1800 },
    { inicio: "01:30", fim: "03:30", nivel: 7, destino: "Lima", valor: 2500 },
    { inicio: "02:00", fim: "04:00", nivel: 5, destino: "Bogotá", valor: 2200 },
    { inicio: "02:30", fim: "05:00", nivel: 8, destino: "Caracas", valor: 2600 },
    { inicio: "03:00", fim: "04:30", nivel: 4, destino: "Rio de Janeiro", valor: 1400 },
    { inicio: "03:30", fim: "06:00", nivel: 9, destino: "Cidade do México", valor: 3500 },
    { inicio: "04:00", fim: "05:30", nivel: 6, destino: "Brasília", valor: 1900 },
    { inicio: "04:30", fim: "07:00", nivel: 10, destino: "Miami", valor: 4200 },
    { inicio: "05:00", fim: "06:30", nivel: 7, destino: "Curitiba", valor: 1600 },
    { inicio: "05:30", fim: "08:00", nivel: 8, destino: "Nova York", valor: 4800 },
    
    // Manhã (6:00 - 12:00) - Adicionando mais demandas
    { inicio: "06:00", fim: "07:00", nivel: 3, destino: "São Paulo", valor: 1200 },
    { inicio: "06:00", fim: "08:30", nivel: 7, destino: "Buenos Aires", valor: 2800 },
    { inicio: "06:30", fim: "07:30", nivel: 2, destino: "Rio de Janeiro", valor: 950 },
    { inicio: "06:30", fim: "09:00", nivel: 8, destino: "Santiago", valor: 3200 },
    { inicio: "07:00", fim: "08:00", nivel: 5, destino: "Brasília", valor: 1500 },
    { inicio: "07:00", fim: "09:30", nivel: 9, destino: "Lima", valor: 2500 },
    { inicio: "07:30", fim: "08:30", nivel: 4, destino: "Curitiba", valor: 1100 },
    { inicio: "07:30", fim: "10:00", nivel: 6, destino: "Bogotá", valor: 2200 },
    { inicio: "08:00", fim: "09:00", nivel: 6, destino: "Porto Alegre", valor: 1800 },
    { inicio: "08:00", fim: "10:30", nivel: 7, destino: "Caracas", valor: 2600 },
    { inicio: "08:30", fim: "09:30", nivel: 2, destino: "Campinas", valor: 800 },
    { inicio: "08:30", fim: "11:00", nivel: 8, destino: "Cidade do México", valor: 3500 },
    { inicio: "09:00", fim: "10:00", nivel: 7, destino: "Salvador", valor: 1600 },
    { inicio: "09:00", fim: "12:00", nivel: 9, destino: "Miami", valor: 4200 },
    { inicio: "09:30", fim: "10:30", nivel: 5, destino: "Recife", valor: 1400 },
    { inicio: "09:30", fim: "12:30", nivel: 10, destino: "Nova York", valor: 4800 },
    { inicio: "10:00", fim: "11:00", nivel: 4, destino: "Fortaleza", valor: 1300 },
    { inicio: "10:00", fim: "12:30", nivel: 8, destino: "Toronto", valor: 4500 },
    { inicio: "10:30", fim: "11:30", nivel: 3, destino: "Manaus", valor: 1000 },
    { inicio: "10:30", fim: "13:00", nivel: 9, destino: "Chicago", valor: 5200 },
    { inicio: "11:00", fim: "12:00", nivel: 8, destino: "Belém", valor: 1900 },
    { inicio: "11:00", fim: "14:00", nivel: 10, destino: "Los Angeles", valor: 5800 },
    
    // Tarde (12:00 - 18:00) - Adicionando mais demandas
    { inicio: "12:00", fim: "13:00", nivel: 6, destino: "São Paulo", valor: 1700 },
    { inicio: "12:00", fim: "14:30", nivel: 7, destino: "Buenos Aires", valor: 2800 },
    { inicio: "12:30", fim: "13:30", nivel: 4, destino: "Rio de Janeiro", valor: 1200 },
    { inicio: "12:30", fim: "15:00", nivel: 8, destino: "Santiago", valor: 3200 },
    { inicio: "13:00", fim: "14:00", nivel: 9, destino: "Brasília", valor: 2200 },
    { inicio: "13:00", fim: "15:30", nivel: 9, destino: "Lima", valor: 2500 },
    { inicio: "13:30", fim: "14:30", nivel: 3, destino: "Curitiba", valor: 900 },
    { inicio: "13:30", fim: "16:00", nivel: 6, destino: "Bogotá", valor: 2200 },
    { inicio: "14:00", fim: "15:00", nivel: 7, destino: "Porto Alegre", valor: 1800 },
    { inicio: "14:00", fim: "16:30", nivel: 7, destino: "Caracas", valor: 2600 },
    { inicio: "14:30", fim: "15:30", nivel: 5, destino: "Campinas", valor: 1300 },
    { inicio: "14:30", fim: "17:00", nivel: 8, destino: "Cidade do México", valor: 3500 },
    { inicio: "15:00", fim: "16:00", nivel: 8, destino: "Salvador", valor: 2000 },
    { inicio: "15:00", fim: "18:00", nivel: 9, destino: "Miami", valor: 4200 },
    { inicio: "15:30", fim: "16:30", nivel: 6, destino: "Recife", valor: 1600 },
    { inicio: "15:30", fim: "18:30", nivel: 10, destino: "Nova York", valor: 4800 },
    { inicio: "16:00", fim: "17:00", nivel: 4, destino: "Fortaleza", valor: 1100 },
    { inicio: "16:00", fim: "18:30", nivel: 8, destino: "Toronto", valor: 4500 },
    { inicio: "16:30", fim: "17:30", nivel: 2, destino: "Manaus", valor: 700 },
    { inicio: "16:30", fim: "19:00", nivel: 9, destino: "Chicago", valor: 5200 },
    { inicio: "17:00", fim: "18:00", nivel: 10, destino: "Belém", valor: 2500 },
    { inicio: "17:00", fim: "20:00", nivel: 10, destino: "Los Angeles", valor: 5800 },
    
    // Noite (18:00 - 24:00) - Adicionando mais demandas
    { inicio: "18:00", fim: "19:00", nivel: 5, destino: "São Paulo", valor: 1400 },
    { inicio: "18:00", fim: "20:30", nivel: 7, destino: "Buenos Aires", valor: 2800 },
    { inicio: "18:30", fim: "19:30", nivel: 3, destino: "Rio de Janeiro", valor: 1000 },
    { inicio: "18:30", fim: "21:00", nivel: 8, destino: "Santiago", valor: 3200 },
    { inicio: "19:00", fim: "20:00", nivel: 7, destino: "Brasília", valor: 1800 },
    { inicio: "19:00", fim: "21:30", nivel: 9, destino: "Lima", valor: 2500 },
    { inicio: "19:30", fim: "20:30", nivel: 4, destino: "Curitiba", valor: 1200 },
    { inicio: "19:30", fim: "22:00", nivel: 6, destino: "Bogotá", valor: 2200 },
    { inicio: "20:00", fim: "21:00", nivel: 6, destino: "Porto Alegre", valor: 1600 },
    { inicio: "20:00", fim: "22:30", nivel: 7, destino: "Caracas", valor: 2600 },
    { inicio: "20:30", fim: "21:30", nivel: 2, destino: "Campinas", valor: 600 },
    { inicio: "20:30", fim: "23:00", nivel: 8, destino: "Cidade do México", valor: 3500 },
    { inicio: "21:00", fim: "22:00", nivel: 8, destino: "Salvador", valor: 2100 },
    { inicio: "21:00", fim: "00:00", nivel: 9, destino: "Miami", valor: 4200 },
    { inicio: "21:30", fim: "22:30", nivel: 5, destino: "Recife", valor: 1500 },
    { inicio: "21:30", fim: "00:30", nivel: 10, destino: "Nova York", valor: 4800 },
    { inicio: "22:00", fim: "23:00", nivel: 3, destino: "Fortaleza", valor: 900 },
    { inicio: "22:00", fim: "00:30", nivel: 8, destino: "Toronto", valor: 4500 },
    { inicio: "22:30", fim: "23:30", nivel: 1, destino: "Manaus", valor: 500 },
    { inicio: "22:30", fim: "01:00", nivel: 9, destino: "Chicago", valor: 5200 },
    { inicio: "23:00", fim: "24:00", nivel: 9, destino: "Belém", valor: 2300 },
    { inicio: "23:00", fim: "02:00", nivel: 10, destino: "Los Angeles", valor: 5800 }
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
