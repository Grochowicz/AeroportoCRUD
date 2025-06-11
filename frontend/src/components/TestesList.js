import React, { useState, useEffect } from "react";
import TesteDataService from "../services/TesteService";
import { Link } from "react-router-dom";

const TestesList = () => {
  const [testes, setTestes] = useState([]);
  const [currentTeste, setCurrentTeste] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNumAnac, setSearchNumAnac] = useState("");

  useEffect(() => {
    retrieveTestes();
  }, []);

  const onChangeSearchNumAnac = (e) => {
  const searchValue = e.target.value;
  setSearchNumAnac(searchValue);
  };

  const retrieveTestes = () => {
    TesteDataService.getAll()
      .then(response => {
        setTestes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTestes();
    setCurrentTeste(null);
    setCurrentIndex(-1);
  };

  const setActiveTeste = (teste, index) => {
    setCurrentTeste(teste);
    setCurrentIndex(index);
  };

  const removeAllTestes = () => {
    TesteDataService.deleteAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNumAnac = () => {
  TesteDataService.findByNumAnac(searchNumAnac)
    .then(response => {
      setTestes(response.data);
      setCurrentTeste(null);
      setCurrentIndex(-1);
    })
    .catch(e => {
      console.log(e);
    });
  };


  return (
    <div className="list row container mt-3">
      <div className="col-md-6">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por número ANAC"
            value={searchNumAnac}
            onChange={onChangeSearchNumAnac}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNumAnac}
            >
              Buscar 
            </button>
          </div>
        </div>

        <h4>Lista de Testes</h4>

        <ul className="list-group">
          {testes &&
            testes.map((teste, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTeste(teste, index)}
                key={index}
              >
                {teste.num_anac}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTestes}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentTeste ? (
          <div>
            <h4>Teste</h4>
            <div><strong>ID:</strong> {currentTeste.id}</div>
            <div><strong>Número ANAC:</strong> {currentTeste.num_anac}</div>
            <div><strong>Data:</strong> {currentTeste.data}</div>
            <div><strong>Duração (horas):</strong> {currentTeste.duracao_horas}</div>
            <div><strong>Resultado:</strong> {currentTeste.resultado}</div>
            <div><strong>ID Avião:</strong> {currentTeste.aviaoId}</div>

            <Link to={"/testes/" + currentTeste.id}>Editar</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um teste</p>
          </div>
        )}
      </div>

      <Link to="/addTeste" className="btn btn-primary"
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
        title="Adicionar Teste"
      >
        +
      </Link>



    </div>
  );
};

export default TestesList;