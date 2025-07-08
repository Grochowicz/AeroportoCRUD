import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ModeloDataService from "../services/ModeloService";

const Modelo = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialModeloState = {
    id: null,
    nome: "",
    capacidade: 0,
    peso: 0
  };
  const [currentModelo, setCurrentModelo] = useState(initialModeloState);
  const [message, setMessage] = useState("");

  const getModelo= id => {
    ModeloDataService.get(id)
      .then(response => {
        setCurrentModelo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getModelo(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentModelo({ ...currentModelo, [name]: value });
  };

  const updateModelo = () => {
    ModeloDataService.update(currentModelo.id, currentModelo)
      .then(response => {
        console.log(response.data);
        setMessage("Atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteModelo= () => {
    ModeloDataService.delete(currentModelo.id)
      .then(response => {
        console.log(response.data);
        navigate("/modelos");
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
    <div>
      {currentModelo? (
        <div className="edit-form container mt-3">
          <h4>Modelo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={currentModelo.nome}
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
                  value={currentModelo.capacidade}
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
                  value={currentModelo.peso}
                  onChange={handleInputChange}
                  name="peso"
                />
              </div>
            </form>

          <button className="btn btn-danger" onClick={deleteModelo}>
            Deletar
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateModelo}
          >
            Atualizar
          </button>
          <p>{message && "Atualizado com sucesso!"}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um modelo</p>
        </div>
      )}
    </div>
  );
};

export default Modelo;