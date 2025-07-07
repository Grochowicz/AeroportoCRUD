import DemandaDataService from "../services/DemandaService";
import { Link } from "react-router-dom";

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
            // if (intersect(demandas[i], demandas[j])) {
                adj_i.push(j); 
            //}
        }
        adj.push(adj_i); 
    }

    
}