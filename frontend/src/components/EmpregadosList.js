import React, { useState, useEffect } from "react";
import EmpregadoDataService from "../services/EmpregadoService";
import { Link } from "react-router-dom";

const EmpregadosList = () => {
  const [empregados, setEmpregados] = useState([]);
  const [currentEmpregado, setCurrentEmpregado] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");

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
    <div className="list row">
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
    </div>
  );
};

export default EmpregadosList;