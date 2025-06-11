import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AviaoDataService from "../services/AviaoService";

const Aviao = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialAviaoState = {
    id: null,
    modeloId: ""
  };
  const [currentAviao, setCurrentAviao] = useState(initialAviaoState);
  const [message, setMessage] = useState("");

  const getAviao = id => {
    AviaoDataService.get(id)
      .then(response => {
        setCurrentAviao(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getAviao(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentAviao({ ...currentAviao, [name]: value });
  };

  const updateAviao = () => {
    AviaoDataService.update(currentAviao.id, currentAviao)
      .then(response => {
        console.log(response.data);
        setMessage("Avião atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAviao = () => {
    AviaoDataService.delete(currentAviao.id)
      .then(response => {
        console.log(response.data);
        navigate("/avioes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentAviao ? (
        <div className="edit-form container mt-3">
          <h4>Avião</h4>
          <form>
            <div className="form-group">
              <label htmlFor="modeloId">Id do Modelo</label>
              <input
                type="number"
                className="form-control"
                id="modeloId"
                required
                value={currentAviao.modeloId}
                onChange={handleInputChange}
                name="modeloId"
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deleteAviao}>
            Deletar
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateAviao}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um avião</p>
        </div>
      )}
    </div>
  );
};

export default Aviao;