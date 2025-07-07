import DemandaDataService from "../services/DemandaService";
import { Link } from "react-router-dom";
import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  ICompare,
  IGetCompareValue,
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

const solve = () => {
    demandas = retrieveDemandas(); 
    avioes = retrieveAvioes(); 

    adj = [] 
    for (let i = 0; i < length(demandas); i++) {
        adj_i = []
        for (let j = i + 1; j < length(demandas); j++) {
            if (intersect(demandas[i].inicio, demandas[i].fim, demandas[j].inicio, demandas[j].fim)) {
                adj_i.push(j); 
            }
        }
        adj.push(adj_i); 
    }

    let can = []
    for (let i = 0; i < length(demandas); i++) {
        can_i = new Map(); 
        for (let j = 0; j < length(avioes); j++) {
            if (avioes[j].nivel >= demandas[i].nivel) { // avioes.nivel não existe, mas so serviria pra indicar se o avião pode atender à demanda
                can_i[j] = 1; 
            }
        }
        can.push(can_i); 
    }

    const demandasQueue = new PriorityQueue((i, j) => {
        a = demandas[i]; 
        b = demandas[j]; 
        if (a.value >= b.value) return 1;
        else return -1; 
    }); 

    for (let i = 0; i < length(demandas); i++) {
        demandasQueue.enqueue(i); 
    }

    let color = new Array(length(demandas), -1); 
    while (!demandasQueue.isEmpty()) {
        let u = demandasQueue.back(); 

        let cant = new Map(); 
        adj[u].forEach(v => {
            cant[color[v]] = 1; 
        });

        can.forEach((col, _) => {
            if (!cant[col]) {
                color[u] = col; 
            }
        });
    }
}