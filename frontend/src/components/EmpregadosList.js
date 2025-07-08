import React, { useState, useEffect } from "react";
import EmpregadoDataService from "../services/EmpregadoService";
import PeritoEmDataService from "../services/PeritoEmService";
import { Link } from "react-router-dom";


const EmpregadosList = () => {
  const [empregados, setEmpregados] = useState([]);
  const [currentEmpregado, setCurrentEmpregado] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");
  const [tecnicoInfo, setTecnicoInfo] = useState(null);
  const [controladorInfo, setControladorInfo] = useState(null);
  const [peritoEmList, setPeritoEmList] = useState([]);

  useEffect(() => {
    retrieveEmpregados();
  }, []);

  const onChangeSearchNome = e => {
    const searchNome = e.target.value;
    setSearchNome(searchNome);
  };

  const retrieveEmpregados = () => {
    EmpregadoDataService.getAll()
      .then(response => {
        setEmpregados(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEmpregados();
    setCurrentEmpregado(null);
    setCurrentIndex(-1);
  };

  const setActiveEmpregado = (empregado, index) => {
    setCurrentEmpregado(empregado);
    setCurrentIndex(index);
    setTecnicoInfo(null);
    setControladorInfo(null);
    setPeritoEmList([]);
    // Fetch tecnico info
    EmpregadoDataService.getTecnicoByEmpregadoId(empregado.id)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setTecnicoInfo(res.data[0]);
          // Fetch perito_em for this tecnico
          PeritoEmDataService.getByTecnicoId(res.data[0].id)
            .then(peritoRes => setPeritoEmList(peritoRes.data))
            .catch(() => setPeritoEmList([]));
        }
      })
      .catch(() => setTecnicoInfo(null));
    // Fetch controlador info
    EmpregadoDataService.getControladorByEmpregadoId(empregado.id)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setControladorInfo(res.data[0]);
        }
      })
      .catch(() => setControladorInfo(null));
  };

  const removeAllEmpregados = () => {
    EmpregadoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNome = () => {
    EmpregadoDataService.findByNome(searchNome)
      .then(response => {
        setEmpregados(response.data);
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
        <h4>Lista de Empregados</h4>

        <ul className="list-group">
          {empregados &&
            empregados.map((empregado, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEmpregado(empregado, index)}
                key={index}
              >
                {empregado.nome}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEmpregados}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentEmpregado ? (
          <div>
            <h4>Empregado</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentEmpregado.id}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentEmpregado.nome}
            </div>
            <div>
              <label>
                <strong>Endereço:</strong>
              </label>{" "}
              {currentEmpregado.endereco}
            </div>
            <div>
              <label>
                <strong>Telefone:</strong>
              </label>{" "}
              {currentEmpregado.telefone}
            </div>
            <div>
              <label>
                <strong>Salário:</strong>
              </label>{" "}
              R$ {parseFloat(currentEmpregado.salario).toFixed(2)}
            </div>
            {tecnicoInfo && (
              <div>
                <label><strong>Tipo:</strong></label> Técnico<br/>
                <label><strong>Salário Base:</strong></label> R$ {parseFloat(tecnicoInfo.salario_base).toFixed(2)}<br/>
                {peritoEmList.length > 0 && (
                  <div>
                    <label><strong>Modelos (Perito em):</strong></label> {peritoEmList.map(p => p.modeloId).join(", ")}
                  </div>
                )}
              </div>
            )}
            {controladorInfo && (
              <div>
                <label><strong>Tipo:</strong></label> Controlador<br/>
                <label><strong>Último Exame:</strong></label> {new Date(controladorInfo.ultimo_exame).toLocaleDateString()}
              </div>
            )}

            <Link to={"/empregados/" + currentEmpregado.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um empregado</p>
          </div>
        )}
      </div>
      <Link to="/addEmpregado" className="btn btn-primary"
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
        title="Adicionar Empregado"
      >
        +
      </Link>

    </div>
  );
};

export default EmpregadosList;