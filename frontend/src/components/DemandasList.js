import React, { useState, useEffect } from "react";
import DemandaDataService from "../services/DemandaService";
import { Link } from "react-router-dom";
import AviaoService from "../services/AviaoService";
import { solve } from "./DemandaAlgo";
import ModeloService from "../services/ModeloService";


const DemandasList= () => {
  const [demandas, setDemandas] = useState([]);
  const [currentDemanda, setCurrentDemanda] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");
  const [avioes, setAvioes] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [groupedDemandas, setGroupedDemandas] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    retrieveDemandas();
    retrieveAvioes();
    retrieveModelos();
  }, []);

  useEffect(() => {
    // Agrupar demandas por destino
    const grouped = demandas.reduce((acc, demanda) => {
      if (!acc[demanda.destino]) {
        acc[demanda.destino] = [];
      }
      acc[demanda.destino].push(demanda);
      return acc;
    }, {});
    setGroupedDemandas(grouped);
  }, [demandas]);

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

  const retrieveAvioes = () => {
    AviaoService.getAll()
      .then(response => {
        setAvioes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveModelos = () => {
    ModeloService.getAll()
      .then(response => {
        setModelos(response.data);
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
    DemandaDataService.findByDestino(searchNome)
      .then(response => {
        setDemandas(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleAutoAssign = async () => {
    if (!demandas.length || !avioes.length) return;
    const avioesCompletos = avioes.map(aviao => {
      const modelo = modelos.find(m => m.id === aviao.modeloId);
      return {
        ...aviao,
        capacidade: modelo ? modelo.capacidade : 0,
      };
    });
    const assignments = solve(demandas, avioesCompletos);
    console.log(assignments);
    for (let i = 0; i < assignments.length; i++) {
      const aviaoIdx = assignments[i];
      if (aviaoIdx !== -1) {
        const demanda = demandas[i];
        const aviao = avioesCompletos[aviaoIdx];
        try {
          await DemandaDataService.update(demanda.id, { ...demanda, aviaoId: aviao.id });
        } catch (e) {
          console.log(e);
        }
      }
    }
    retrieveAvioes();
    retrieveDemandas();
    alert("Atribuição automática concluída!");
  };

  return (
    <div className="list row container mt-3">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por destino"
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
        <button className="btn btn-primary mb-2" onClick={handleAutoAssign}>
          Auto-atribuir Aviões
        </button>

        {Object.entries(groupedDemandas).map(([destino, demandasDestino]) => (
          <div key={destino} className="card mb-2">
            <div 
              className="card-header" 
              onClick={() => setExpandedGroups(prev => ({
                ...prev, 
                [destino]: !prev[destino]
              }))}
              style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
            >
              <strong>{destino}</strong> ({demandasDestino.length} demandas)
              <span className="float-right">
                {expandedGroups[destino] ? '▼' : '▶'}
              </span>
            </div>
            {expandedGroups[destino] && (
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {demandasDestino.map((demanda, index) => (
                    <li
                      key={demanda.id}
                      className={`list-group-item ${demanda.id === currentDemanda?.id ? "active" : ""}`}
                      onClick={() => setActiveDemanda(demanda, index)}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: demanda.aviaoId 
                          ? 'rgba(40, 167, 69, 0.2)' // Verde com baixa opacidade para demandas atendidas
                          : 'rgba(220, 53, 69, 0.2)' // Vermelho com baixa opacidade para demandas não atendidas
                      }}
                    >
                      {demanda.inicio} - {demanda.fim} (Nível: {demanda.nivel}, Valor: R$ {demanda.valor})
                      {demanda.aviaoId && (
                        <span className="badge badge-success ml-2">Atendida</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

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

            {/* TODO: Adicionar link para editar demanda ou não? */}
            {/* <Link to={"/demandas/" + currentDemanda.id}>
              Editar
            </Link> */}
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