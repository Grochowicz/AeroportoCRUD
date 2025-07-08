import DemandaDataService from "../services/DemandaService.js";
import AviaoDataService from "../services/AviaoService.js";
import { Link } from "react-router-dom";
import {
  PriorityQueue,
//   MinPriorityQueue,
   //MaxPriorityQueue,
//   ICompare,
//   IGetCompareValue,
} from '@datastructures-js/priority-queue';

const retrieveDemandas = () => {
    DemandaDataService.getAll()
    .then(response => {
        console.log(response.data);
        return response.data; 
    })
    .catch(e => {
        console.log(e);
        return null; 
    });
};

const retrieveAvioes = () => {
    AviaoDataService.getAll()
        .then(response => {
            console.log(response.data);
            return response.data; 
        })
        .catch(e => {
            console.log(e);
            return null; 
        });
};

const intersect = (inicio1, fim1, inicio2, fim2) => {
    return inicio1 <= fim2 && fim1 >= inicio2; 
}

const solve = (demandas, avioes) => {
    let adj = [];
    for (let i = 0; i < demandas.length; i++) {
        let adj_i = [];
        for (let j = 0; j < demandas.length; j++) if (i !== j) {
            if (intersect(demandas[i].inicio, demandas[i].fim, demandas[j].inicio, demandas[j].fim)) {
                adj_i.push(j);
                console.log("Adicionando aresta entre " + i + " e " + j);
            }
        }
        adj.push(adj_i);
    }

    let can = [];
    for (let i = 0; i < demandas.length; i++) {
        let can_i = new Map();
        for (let j = 0; j < avioes.length; j++) {
            if (avioes[j].capacidade >= demandas[i].nivel) { // fix: use capacidade
                can_i.set(j, 1);
                console.log("Demanda " + i + " pode ser atendida pelo avião " + j);
            }
        }
        can.push(can_i);
    }

    const demandasQueue = new PriorityQueue((i, j) => {
        const a = demandas[i];
        const b = demandas[j];
        if (a.valor <= b.valor) return 1;
        else return -1;
    });

    for (let i = 0; i < demandas.length; i++) {
        demandasQueue.enqueue(i);
    }

    let color = new Array(demandas.length).fill(-1); // fix: fill array with -1
    while (!demandasQueue.isEmpty()) {
        let u = demandasQueue.front(); 
        demandasQueue.dequeue(); // dequeue after using back

        console.log("Demanda " + u + " está sendo processada");

        let cant = new Map();
        adj[u].forEach(v => {
            if (color[v] !== -1) {
                cant.set(color[v], 1);
            }
        });

        // Try to assign a plane (color) to this demand
        for (let [col] of can[u]) {
            if (!cant.has(col)) {
                color[u] = col;
                break;
            }
        }
    }
    // color[i] = plane index assigned to demand i, or -1 if unassigned
    return color;
}

function testDemandaAlgo() {
  // Mock planes
  const planes = [
    { id: 1, capacidade: 5 },
    { id: 2, capacidade: 3 }
  ];

  // Mock demands
  const demands = [
    { id: 1, inicio: 60, fim: 140, nivel: 3, valor: 100 }, // 1:00 - 2:00
    { id: 3, inicio: 130, fim: 200, nivel: 5, valor: 300 }, // 2:10 - 3:20
    { id: 2, inicio: 90, fim: 150, nivel: 2, valor: 200 }, // 1:30 - 2:30
  ];

  // Call your assignment function
  const assignments = solve(demands, planes);

  // Print results
  console.log("Assignments:", assignments);
}

// Uncomment to run the test
//  testDemandaAlgo();

export { solve };