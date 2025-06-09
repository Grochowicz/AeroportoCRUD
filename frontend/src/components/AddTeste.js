import React, { useState } from "react";
import TesteDataService from "../services/TesteService";

const AddTeste = () => {
  const initialTesteState = {
    id: null,
    num_anac: "",
    data: "",
    duracao_horas: "",
    resultado: "",
    aviaoId: ""
  };
  const [teste, setTeste] = useState(initialTesteState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTeste({ ...teste, [name]: value });
  };

  const saveTeste = () => {
    TesteDataService.create(teste)
      .then(response => {
        setTeste({ ...response.data });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTeste = () => {
    setTeste(initialTesteState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Teste enviado com sucesso!</h4>
          <button className="btn btn-success" onClick={newTeste}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="num_anac">Número ANAC</label>
            <input
              type="number"
              className="form-control"
              id="num_anac"
              required
              value={teste.num_anac}
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
              required
              value={teste.data}
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
              required
              value={teste.duracao_horas}
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
              required
              value={teste.resultado}
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
              required
              value={teste.aviaoId}
              onChange={handleInputChange}
              name="aviaoId"
            />
          </div>

          <button onClick={saveTeste} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTeste;