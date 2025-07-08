import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DemandaDataService from "../services/DemandaService";
import TesteDataService from "../services/TesteService";

const Demanda = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialDemandaState = {
    id: null,
    inicio: "",
    fim: "",
    nivel: "",
    destino: "",
    valor: ""
  };
  const [currentDemanda, setCurrentDemanda] = useState(initialDemandaState);
  const [message, setMessage] = useState("");

  const getDemanda = id => {
    DemandaDataService.get(id)
      .then(response => {
        setCurrentDemanda(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getDemanda(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDemanda({ ...currentDemanda, [name]: value });
  };

  const updateDemanda= () => {
    // Helper para converter HH:MM para minutos
    const timeToMinutes = (hhmm) => {
      if (!hhmm) return 0;
      const [hours, minutes] = hhmm.split(":").map(Number);
      return hours * 60 + minutes;
    };
    console.log(currentDemanda.inicio);
    console.log(currentDemanda.fim);
    console.log(timeToMinutes(currentDemanda.inicio));
    console.log(timeToMinutes(currentDemanda.fim));
    const data = {
      inicio: timeToMinutes(currentDemanda.inicio),
      fim: timeToMinutes(currentDemanda.fim),
      nivel: currentDemanda.nivel,
      destino: currentDemanda.destino,
      valor: currentDemanda.valor, 
      aviaoId: currentDemanda.aviaoId
    };
    DemandaDataService.update(currentDemanda.id, data)
      .then(response => {
        setMessage("Demanda atualizada com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDemanda= () => {
    DemandaDataService.delete(currentDemanda.id)
      .then(response => {
        navigate("/testes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDemanda ? (
        <div className="edit-form container mt-3">
          <h4>Demanda</h4>
          <form>
            <div className="form-group">
              <label htmlFor="inicio">Início (horas:minutos)</label>
              <input
                type="time"
                className="form-control"
                id="inicio"
                required
                value={currentDemanda.inicio}
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
                value={currentDemanda.fim}
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
                value={currentDemanda.nivel}
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
                value={currentDemanda.destino}
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
                value={currentDemanda.valor}
                onChange={handleInputChange}
                name="valor"
              />
            </div>
          </form>
          <button className="btn btn-danger" onClick={deleteDemanda}>
            Deletar
          </button>
          <button className="btn btn-success ml-2" onClick={updateDemanda}>
            Atualizar
          </button>
          <p>{message && "Atualizado com sucesso!"}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em uma demanda</p>
        </div>
      )}
    </div>
  );
};

export default Demanda;