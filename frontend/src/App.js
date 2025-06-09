import React, {Component} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import AddModelo from './components/AddModelo';
import Modelo from "./components/Modelo";
import ModelosList from './components/ModelosList';

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/modelos" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/modelos"} className="nav-link">
                Modelos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addModelo"} className="nav-link">
                Adicionar Modelo
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/addEmpregado"} className="nav-link">
                Adicionar Empregado
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/empregado"} className="nav-link">
                Empregados
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ModelosList/>} />
            <Route path="/modelos" element={<ModelosList/>} />
            <Route path="/addModelo" element={<AddModelo/>} />
            <Route path="/modelos/:id" element={<Modelo/>} />

            {/* <Route path="/empregado" element={<EmpregadosList/>} />
            <Route path="/addEmpregado" element={<AddEmpregado/>} /> */}
          </Routes>
        </div>
      </div>
    );
}

export default App;
