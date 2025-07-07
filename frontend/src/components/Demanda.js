import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DemandaDataService from "../services/DemandaService";

const Demanda = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialDemandaState = {
    id: null,
    tipo: 0, // 0 -> demanda de voo para fora (lugar = pra onde vai)
             // 1 -> demanda de voo pra ca (lugar = de onde vem)
    lugar: "",
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

  // to do: mostrar demanda
  return (
    <div>
      {/* {currentDemanda ? (
        <div className="edit-form container mt-3">
          <h4>Teste</h4>
          <form>
            <div className="form-group">
              <label htmlFor="num_anac">Número ANAC</label>
              <input
                type="number"
                className="form-control"
                id="num_anac"
                value={currentTeste.num_anac}
                onChange={handleInputChange}
                name="num_anac"
              />
            </div>

            <div className="form-group">
              <label htmlFor="data">Data</label>
              <input
                type="date"
                className="form-control"
                id="data"
                value={currentTeste.data}
                onChange={handleInputChange}
                name="data"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duracao_horas">Duração (horas)</label>
              <input
                type="number"
                className="form-control"
                id="duracao_horas"
                value={currentTeste.duracao_horas}
                onChange={handleInputChange}
                name="duracao_horas"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resultado">Resultado</label>
              <input
                type="text"
                className="form-control"
                id="resultado"
                value={currentTeste.resultado}
                onChange={handleInputChange}
                name="resultado"
              />
            </div>

            <div className="form-group">
              <label htmlFor="aviaoId">ID do Avião</label>
              <input
                type="number"
                className="form-control"
                id="aviaoId"
                value={currentTeste.aviaoId}
                onChange={handleInputChange}
                name="aviaoId"
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deleteTeste}>
            Deletar
          </button>

          <button className="btn btn-success" onClick={updateTeste}>
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um teste</p>
        </div>
      )} */}
    </div>
  );
};

export default Demanda;