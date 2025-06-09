import React, { useState } from "react";
import EmpregadoDataService from "../services/EmpregadoService";

const AddEmpregado = () => {
  const initialEmpregadoState = {
    id: null,
    nome: "",
    endereco: "",
    telefone: "",
    salario: ""
  };

  const [empregado, setEmpregado] = useState(initialEmpregadoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmpregado({ ...empregado, [name]: value });
  };

  const saveEmpregado = () => {
    const data = {
      nome: empregado.nome,
      endereco: empregado.endereco,
      telefone: empregado.telefone,
      salario: empregado.salario
    };

    EmpregadoDataService.create(data)
      .then(response => {
        setEmpregado({
          id: response.data.id,
          nome: response.data.nome,
          endereco: response.data.endereco,
          telefone: response.data.telefone,
          salario: response.data.salario
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmpregado = () => {
    setEmpregado(initialEmpregadoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Empregado adicionado com sucesso!</h4>
          <button className="btn btn-success" onClick={newEmpregado}>
            Adicionar outro
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={empregado.nome}
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
              value={empregado.endereco}
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
              value={empregado.telefone}
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
              value={empregado.salario}
              onChange={handleInputChange}
              name="salario"
            />
          </div>

          <button onClick={saveEmpregado} className="btn btn-success">
            Salvar 
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmpregado;