import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/ModeloService";
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
    TutorialDataService.getAll()
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
    TutorialDataService.removeAll()
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
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
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
            <p>Por favor, clique em um tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelosList; 