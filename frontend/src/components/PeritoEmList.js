import React, { useState, useEffect } from "react";
import PeritoEmDataService from "../services/PeritoEmService";
import { Link } from "react-router-dom";

const PeritoEmList = () => {
  const [relacoes, setRelacoes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveRelacoes();
  }, []);

  const retrieveRelacoes = () => {
    PeritoEmDataService.getAll()
      .then(response => {
        setRelacoes(response.data);
      })
      .catch(e => console.log(e));
  };

  const refreshList = () => {
    retrieveRelacoes();
    setCurrent(null);
    setCurrentIndex(-1);
  };

  const setActive = (item, index) => {
    setCurrent(item);
    setCurrentIndex(index);
  };

  const removeAll = () => {
    PeritoEmDataService.deleteAll()
      .then(() => refreshList())
      .catch(e => console.log(e));
  };

  return (
    <div className="list row container mt-3">
      <div className="col-md-6">
        <h4>Relacionamentos perito_em</h4>
        <ul className="list-group">
          {relacoes &&
            relacoes.map((item, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActive(item, index)}
                key={index}
              >
                Técnico: {item.tecnicoId} | Modelo: {item.modeloId}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAll}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {current ? (
          <div>
            <h4>Detalhes</h4>
            <div>
              <strong>Técnico:</strong> {current.tecnicoId}
            </div>
            <div>
              <strong>Modelo:</strong> {current.modeloId}
            </div>
            <Link to={"/perito_em/" + current.id}>Editar</Link>
          </div>
        ) : (
          <p>Clique em um(a) perito_em</p>
        )}
      </div>

      <Link to="/addPerito_em" className="btn btn-primary bg-primary"
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
        title="Adicionar Relação Perito Em"
      >
        +
      </Link>



    </div>
  );
};

export default PeritoEmList;