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

const timeToMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
};

const solve = (demandas, avioes) => {
    const demandasParaAlgoritmo = demandas.map(d => ({
        ...d,
        inicio: timeToMinutes(d.inicio),
        fim: timeToMinutes(d.fim)
    }));

    let adj = [];
    for (let i = 0; i < demandasParaAlgoritmo.length; i++) {
        let adj_i = [];
        for (let j = 0; j < demandasParaAlgoritmo.length; j++) if (i !== j) {
            if (intersect(demandasParaAlgoritmo[i].inicio, demandasParaAlgoritmo[i].fim, demandasParaAlgoritmo[j].inicio, demandasParaAlgoritmo[j].fim)) {
                adj_i.push(j);
                console.log("Adicionando aresta entre " + i + " e " + j);
            }
        }
        adj.push(adj_i);
    }

    let can = [];
    for (let i = 0; i < demandasParaAlgoritmo.length; i++) {
        let can_i = new Map();
        for (let j = 0; j < avioes.length; j++) {
            if (avioes[j].capacidade >= demandasParaAlgoritmo[i].nivel) { // fix: use capacidade
                can_i.set(j, 1);
                console.log("Demanda " + i + " pode ser atendida pelo avião " + j);
            }
        }
        can.push(can_i);
    }

    const demandasQueue = new PriorityQueue((i, j) => {
        const a = demandasParaAlgoritmo[i];
        const b = demandasParaAlgoritmo[j];
        if (a.valor <= b.valor) return 1;
        else return -1;
    });

    for (let i = 0; i < demandasParaAlgoritmo.length; i++) {
        demandasQueue.enqueue(i);
    }

    let color = new Array(demandasParaAlgoritmo.length).fill(-1); // fix: fill array with -1
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
    { id: 1, inicio: "13:45", fim: "14:45", nivel: 3, valor: 100 }, // 1:00 - 2:00
    { id: 3, inicio: "14:30", fim: "15:20", nivel: 5, valor: 300 }, // 2:10 - 3:20
    { id: 2, inicio: "13:30", fim: "14:30", nivel: 2, valor: 200 }, // 1:30 - 2:30
  ];

  // Call your assignment function
  const assignments = solve(demands, planes);

  // Print results
  console.log("Assignments:", assignments);
}

// Uncomment to run the test
//  testDemandaAlgo();

export { solve };