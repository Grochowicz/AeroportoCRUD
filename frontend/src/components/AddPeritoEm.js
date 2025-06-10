import React, { useState } from "react";
import PeritoEmDataService from "../services/PeritoEmService";

const AddPeritoEm = () => {
  const initialState = {
    id: null,
    tecnico_perito: "",
    modeloId: ""
  };

  const [peritoEm, setPeritoEm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPeritoEm({ ...peritoEm, [name]: value });
  };

  const savePeritoEm = () => {
    PeritoEmDataService.create(peritoEm)
      .then(response => {
        setPeritoEm({
          id: response.data.id,
          tecnico_perito: response.data.tecnico_perito,
          modeloId: response.data.modeloId
        });
        setSubmitted(true);
      })
      .catch(e => console.log(e));
  };

  const newPeritoEm = () => {
    setPeritoEm(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Relacionamento cadastrado com sucesso!</h4>
          <button className="btn btn-success" onClick={newPeritoEm}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="tecnico_perito">Técnico</label>
            <input
              type="text"
              className="form-control"
              id="tecnico_perito"
              required
              value={peritoEm.tecnico_perito}
              onChange={handleInputChange}
              name="tecnico_perito"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modeloId">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="modeloId"
              required
              value={peritoEm.modeloId}
              onChange={handleInputChange}
              name="modeloId"
            />
          </div>

          <button onClick={savePeritoEm} className="btn btn-success">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPeritoEm;