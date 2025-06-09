import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TesteDataService from "../services/TesteService";

const Teste = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTesteState = {
    id: null,
    num_anac: "",
    data: "",
    duracao_horas: "",
    resultado: "",
    aviaoId: ""
  };
  const [currentTeste, setCurrentTeste] = useState(initialTesteState);
  const [message, setMessage] = useState("");

  const getTeste = id => {
    TesteDataService.get(id)
      .then(response => {
        setCurrentTeste(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getTeste(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTeste({ ...currentTeste, [name]: value });
  };

  const updateTeste = () => {
    TesteDataService.update(currentTeste.id, currentTeste)
      .then(response => {
        setMessage("Teste atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTeste = () => {
    TesteDataService.delete(currentTeste.id)
      .then(response => {
        navigate("/testes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTeste ? (
        <div className="edit-form">
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
      )}
    </div>
  );
};

export default Teste;