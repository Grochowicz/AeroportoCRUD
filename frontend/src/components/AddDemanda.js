import React, { useState } from "react";
import DemandaDataService from "../services/DemandaService";

const AddDemanda = () => {
  const initialDemandaState = {
    id: null,
    inicio: "",
    fim: "",
    nivel: "",
    destino: "",
    valor: ""
  };
  const [demanda, setDemanda] = useState(initialDemandaState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDemanda({ ...demanda, [name]: value });
  };

  // Helper to convert HH:MM to minutes
  const timeToMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [hours, minutes] = hhmm.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const saveDemanda = () => {
    const data = {
      inicio: demanda.inicio,
      fim: demanda.fim,
      nivel: demanda.nivel,
      valor: demanda.valor, 
      destino: demanda.destino,
      valor: demanda.valor
    };

    DemandaDataService.create(data)
      .then(response => {
        setDemanda({
          id: response.data.id,
          inicio: response.data.inicio,
          fim: response.data.fim,
          nivel: response.data.nivel,
          destino: response.data.destino,
          valor: response.data.valor
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newDemanda = () => {
    setDemanda(initialDemandaState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form container mt-3">
      {submitted ? (
        <div>
          <h4>Você adicionou a demanda com sucesso!</h4>
          <button className="btn btn-success" onClick={newDemanda}>
            Adicionar outra
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="inicio">Início (horas:minutos)</label>
            <input
              type="time"
              className="form-control"
              id="inicio"
              required
              value={demanda.inicio}
              onChange={handleInputChange}
              name="inicio"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fim">Fim (horas:minutos)</label>
            <input
              type="time"
              className="form-control"
              id="fim"
              required
              value={demanda.fim}
              onChange={handleInputChange}
              name="fim"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nivel">Nível</label>
            <input
              type="number"
              className="form-control"
              id="nivel"
              required
              value={demanda.nivel}
              onChange={handleInputChange}
              name="nivel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="destino">Destino</label>
            <input
              type="text"
              className="form-control"
              id="destino"
              required
              value={demanda.destino}
              onChange={handleInputChange}
              name="destino"
            />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor (estimativa de lucro)</label>
            <input
              type="number"
              className="form-control"
              id="valor"
              required
              value={demanda.valor}
              onChange={handleInputChange}
              name="valor"
            />
          </div>
          <button onClick={saveDemanda} className="btn btn-success">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDemanda;
