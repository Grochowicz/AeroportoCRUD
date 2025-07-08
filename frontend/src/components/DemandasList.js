import React, { useState, useEffect } from "react";
import DemandaDataService from "../services/DemandaService";
import { Link } from "react-router-dom";


const DemandasList= () => {
  const [demandas, setDemandas] = useState([]);
  const [currentDemanda, setCurrentDemanda] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");

  useEffect(() => {
    retrieveDemandas();
  }, []);

  const onChangeSearchNome = e => {
    const searchNome = e.target.value;
    setSearchNome(searchNome);
  };

  const retrieveDemandas = () => {
    DemandaDataService.getAll()
      .then(response => {
        setDemandas(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDemandas();
    setCurrentDemanda(null);
    setCurrentIndex(-1);
  };

  const setActiveDemanda = (demanda, index) => {
    setCurrentDemanda(demanda);
    setCurrentIndex(index);
  };

  const removeAllDemandas = () => {
    DemandaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNome = () => {
    DemandaDataService.findByNome(searchNome)
      .then(response => {
        setDemandas(response.data);
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
            value={searchNome}
            onChange={onChangeSearchNome}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNome}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Demandas</h4>

        <ul className="list-group">
          {demandas &&
            demandas.map((demanda, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveDemanda(demanda, index)}
                key={index}
              >
                {demanda.nome}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllDemandas}
        >
          Remover Todas
        </button>
      </div>
      <div className="col-md-6">
        {currentDemanda ? (
          <div>
            <h4>Demanda</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentDemanda.id}
            </div>
            <div>
              <label>
                <strong>Inicio:</strong>
              </label>{" "}
              {currentDemanda.inicio}
            </div>
            <div>
              <label>
                <strong>Fim:</strong>
              </label>{" "}
              {currentDemanda.fim}
            </div>
            <div>
              <label>
                <strong>Valor:</strong>
              </label>{" "}
              {currentDemanda.valor}
            </div>
            <div>
              <label>
                <strong>Nivel:</strong>
              </label>{" "}
              {currentDemanda.nivel}
            </div>

            <Link to={"/demandas/" + currentDemanda.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em uma demanda</p>
          </div>
        )}
      </div>
      <Link to="/addDemanda" className="btn btn-primary"
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
        title="Adicionar Demanda"
      >
        +
      </Link>
    </div>
  );
};

export default DemandasList;