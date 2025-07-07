import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DemandaDataService from "../services/DemandaService";

const Demanda = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialDemandaState = {
    id: null,
    inicio: 0,
    fim: 0, 
    valor: 0, 
    nivel: 0, 
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
    TesteDataService.update(currentDemanda.id, currentDemanda)
      .then(response => {
        setMessage("Teste atualizado com sucesso!");
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
              <label htmlFor="inicio">Inicio</label>
              <input
                type="date"
                className="form-control"
                id="inicio"
                value={currentDemanda.inicio}
                onChange={handleInputChange}
                name="inicio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fim">Fim</label>
              <input
                type="date"
                className="form-control"
                id="fim"
                value={currentDemanda.fim}
                onChange={handleInputChange}
                name="fim"
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor</label>
              <input
                type="number"
                className="form-control"
                id="valor"
                value={currentDemanda.valor}
                onChange={handleInputChange}
                name="valor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nivel">Nivel</label>
              <input
                type="number"
                className="form-control"
                id="nivel"
                value={currentDemanda.nivel}
                onChange={handleInputChange}
                name="nivel"
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deleteDemanda}>
            Deletar
          </button>

          <button className="btn btn-success" onClick={updateDemanda}>
            Atualizar
          </button>
          <p>{message}</p>
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