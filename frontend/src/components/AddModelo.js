import React, { useState } from "react";
import TutorialDataService from "../services/ModeloService";

const AddModelo = () => {
  const initialModeloState = {
    id: null,
    nome: "", 
    capacidade: 0, 
    peso: 0
  };
  const [modelo, setModelo] = useState(initialModeloState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setModelo({ ...modelo, [name]: value });
  };

  const saveModelo = () => {
    var data = {
      nome: modelo.nome, 
      capacidade: modelo.capacidade, 
      peso: modelo.peso
    };

    TutorialDataService.create(data)
      .then(response => {
        setModelo({
          id: response.data.id,
          nome: response.data.nome,
          capacidade: response.data.capacidade, 
          peso: response.data.peso
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newModelo = () => {
    setModelo(initialModeloState);
    setSubmitted(false);
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newModelo}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={modelo.nome}
              onChange={handleInputChange}
              name="nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacidade">Capacidade</label>
            <input
              type="text"
              className="form-control"
              id="capacidade"
              required
              value={modelo.capacidade}
              onChange={handleInputChange}
              name="capacidade"
            />
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso</label>
            <input
              type="text"
              className="form-control"
              id="peso"
              required
              value={modelo.peso}
              onChange={handleInputChange}
              name="peso"
            />
          </div>

          <button onClick={saveModelo} className="btn btn-success">
            Salvar 
          </button>
        </div>
      )}
    </div>
  );
};

export default AddModelo;