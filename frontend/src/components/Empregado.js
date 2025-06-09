import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EmpregadoDataService from "../services/EmpregadoService";

const Empregado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialEmpregadoState = {
    id: null,
    nome: "",
    endereco: "",
    telefone: "",
    salario: ""
  };

  const [currentEmpregado, setCurrentEmpregado] = useState(initialEmpregadoState);
  const [message, setMessage] = useState("");

  const getEmpregado = id => {
    EmpregadoDataService.get(id)
      .then(response => {
        setCurrentEmpregado(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getEmpregado(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmpregado({ ...currentEmpregado, [name]: value });
  };

  const updateEmpregado = () => {
    EmpregadoDataService.update(currentEmpregado.id, currentEmpregado)
      .then(response => {
        setMessage("Empregado editado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEmpregado = () => {
    EmpregadoDataService.delete(currentEmpregado.id)
      .then(response => {
        navigate("/empregados");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmpregado ? (
        <div className="edit-form">
          <h4>Empregado</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={currentEmpregado.nome}
                onChange={handleInputChange}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                required
                value={currentEmpregado.endereco}
                onChange={handleInputChange}
                name="endereco"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                required
                value={currentEmpregado.telefone}
                onChange={handleInputChange}
                name="telefone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salario">Salário</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="salario"
                required
                value={currentEmpregado.salario}
                onChange={handleInputChange}
                name="salario"
              />
            </div>
          </form>

          <button className="button" onClick={deleteEmpregado}>
            Deletar
          </button>

          <button
            type="submit"
            className="button"
            onClick={updateEmpregado}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um empregado</p>
        </div>
      )}
    </div>
  );
};

export default Empregado;