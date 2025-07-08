import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PeritoEmDataService from "../services/PeritoEmService";

const PeritoEm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    id: null,
    tecnicoId: "",
    modeloId: ""
  };

  const [peritoEm, setPeritoEm] = useState(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) getPeritoEm(id);
  }, [id]);

  const getPeritoEm = id => {
    PeritoEmDataService.get(id)
      .then(response => {
        setPeritoEm(response.data);
      })
      .catch(e => console.log(e));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPeritoEm({ ...peritoEm, [name]: value });
  };

  const updatePeritoEm = () => {
    PeritoEmDataService.update(peritoEm.id, peritoEm)
      .then(response => {
        setMessage("Atualizado com sucesso!");
      })
      .catch(e => console.log(e));
  };

  const deletePeritoEm = () => {
    PeritoEmDataService.delete(peritoEm.id)
      .then(() => navigate("/perito_em"))
      .catch(e => console.log(e));
  };

  return (
    <div>
      {peritoEm ? (
        <div className="edit-form container mt-3">
          <h4>Perito em</h4>
          <form>
            <div className="form-group">
              <label htmlFor="tecnicoId">Técnico</label>
              <input
                type="text"
                className="form-control"
                id="tecnicoId"
                value={peritoEm.tecnicoId}
                onChange={handleInputChange}
                name="tecnicoId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modeloId">Modelo</label>
              <input
                type="text"
                className="form-control"
                id="modeloId"
                value={peritoEm.modeloId}
                onChange={handleInputChange}
                name="modeloId"
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deletePeritoEm}>
            Deletar
          </button>

          <button className="btn btn-success" onClick={updatePeritoEm}>
            Atualizar
          </button>
          <p>{message && "Atualizado com sucesso!"}</p>
        </div>
      ) : (
        <p>Clique em um(a) perito_em</p>
      )}
    </div>
  );
};

export default PeritoEm;