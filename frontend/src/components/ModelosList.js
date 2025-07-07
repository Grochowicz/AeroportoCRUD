import React, { useState, useEffect } from "react";
import ModeloDataService from "../services/ModeloService";
import { Link } from "react-router-dom";

const ModelosList = () => {
  const [modelos, setModelos] = useState([]);
  const [currentModelo, setCurrentModelo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveModelos();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveModelos= () => {
    ModeloDataService.getAll()
      .then(response => {
        setModelos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveModelos();
    setCurrentModelo(null);
    setCurrentIndex(-1);
  };

  const setActiveModelo = (tutorial, index) => {
    setCurrentModelo(tutorial);
    setCurrentIndex(index);
  };

  const removeAllModelos = () => {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setModelos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row container mt-3">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Buscar 
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Modelos</h4>

        <ul className="list-group">
          {modelos &&
            modelos.map((modelo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveModelo(modelo, index)}
                key={index}
              >
                {modelo.nome}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllModelos}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentModelo ? (
          <div>
            <h4>Modelo</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentModelo.id}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentModelo.nome}
            </div>
            <div>
              <label>
                <strong>Capacidade:</strong>
              </label>{" "}
              {currentModelo.capacidade}
            </div>
            <div>
              <label>
                <strong>Peso:</strong>
              </label>{" "}
              {currentModelo.peso}
            </div>

            <Link
              to={"/modelos/" + currentModelo.id}
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um modelo</p>
          </div>
        )}
      </div>

      <Link to="/addModelo" className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          zIndex: 999
        }}
        title="Adicionar Modelo"
      >
        +
      </Link>

    </div>
  );
};

export default ModelosList; 