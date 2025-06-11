import React, { useState } from "react";
import AviaoDataService from "../services/AviaoService";

const AddAviao = () => {
  const initialAviaoState = {
    id: null,
    modeloId: ""
  };
  const [aviao, setAviao] = useState(initialAviaoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAviao({ ...aviao, [name]: value });
  };

  const saveAviao = () => {
    const data = {
      modeloId: aviao.modeloId
    };

    AviaoDataService.create(data)
      .then(response => {
        setAviao({
          id: response.data.id,
          modeloId: response.data.modeloId
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newAviao = () => {
    setAviao(initialAviaoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form container mt-3">
      {submitted ? (
        <div>
          <h4>Você adicionou o avião com sucesso!</h4>
          <button className="btn btn-success" onClick={newAviao}>
            Adicionar outro
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="modeloId">Modelo ID</label>
            <input
              type="number"
              className="form-control"
              id="modeloId"
              required
              value={aviao.modeloId}
              onChange={handleInputChange}
              name="modeloId"
            />
          </div>

          <button onClick={saveAviao} className="btn btn-success">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAviao;
