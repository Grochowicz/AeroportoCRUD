import React, { useState, useEffect } from "react";
import AviaoDataService from "../services/AviaoService";
import { Link } from "react-router-dom";
import ModeloService from "../services/ModeloService";
import DemandaDataService from "../services/DemandaService";

const AvioesList = () => {
  const [avioes, setAvioes] = useState([]);
  const [currentAviao, setCurrentAviao] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchId, setSearchId] = useState("");
  const [modelos, setModelos] = useState([]);
  const [demandas, setDemandas] = useState([]);

  useEffect(() => {
    retrieveAvioes();
    retrieveModelos();
    retrieveDemandas();
  }, []);

  const onChangeSearchId = e => {
    const searchId = e.target.value;
    setSearchId(searchId);
  };

  const retrieveAvioes = () => {
    AviaoDataService.getAll()
      .then(response => {
        setAvioes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveModelos = () => {
    ModeloService.getAll()
      .then(response => setModelos(response.data))
      .catch(e => console.log(e));
  };

  const retrieveDemandas = () => {
    DemandaDataService.getAll()
      .then(response => setDemandas(response.data))
      .catch(e => console.log(e));
  };

  const refreshList = () => {
    retrieveAvioes();
    setCurrentAviao(null);
    setCurrentIndex(-1);
  };

  const setActiveAviao = (aviao, index) => {
    setCurrentAviao(aviao);
    setCurrentIndex(index);
  };

  const removeAllAvioes = () => {
    AviaoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findById = () => {
    AviaoDataService.findByModelo(searchId)
      .then(response => {
        setAvioes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const timeToMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };

  return (
    <div className="list row container mt-3">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por modelo"
            value={searchId}
            onChange={onChangeSearchId}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findById}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Aviões</h4>

        <ul className="list-group">
          {avioes &&
            avioes.map((aviao, index) => {
              const modelo = modelos.find(m => m.id === aviao.modeloId);
              return (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveAviao(aviao, index)}
                  key={index}
                >
                  Avião #{aviao.id} (modelo "{modelo ? modelo.nome : aviao.modeloId}")
                </li>
              );
            })}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAvioes}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentAviao ? (
          <div>
            <h4>Detalhes</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentAviao.id}
            </div>
            <div>
              <label>
                <strong>Modelo:</strong>
              </label>{" "}
              {(() => {
                const modelo = modelos.find(m => m.id === currentAviao.modeloId);
                return modelo ? modelo.nome : currentAviao.modeloId;
              })()}
            </div>
            <div>
              <label>
                <strong>Demanda:</strong>
              </label>{" "}
              {(() => {
                const now = new Date();
                const minutosAgora = now.getHours() * 60 + now.getMinutes();
                const demandasAviao = demandas.filter(d => d.aviaoId === currentAviao.id);
                const ocupada = demandasAviao.some(d => 
                  timeToMinutes(d.inicio) <= minutosAgora && timeToMinutes(d.fim) >= minutosAgora
                );
                return ocupada ? "Ocupado" : "Disponível";
              })()}
            </div>
            <div>
              <label>
                <strong>Demandas deste avião:</strong>
              </label>
              <ul>
                {demandas
                  .filter(d => d.aviaoId === currentAviao.id)
                  .map(d => (
                    <li key={d.id}>
                      {d.destino} ({d.inicio} - {d.fim})
                    </li>
                  ))}
              </ul>
            </div>
            <Link to={"/avioes/" + currentAviao.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um avião</p>
          </div>
        )}
      </div>

      <Link to="/addAviao" className="btn btn-primary btn-add"
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
        title="Adicionar Avião"
      >
        +
      </Link>

    </div>
  );
};

export default AvioesList;