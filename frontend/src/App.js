import React, {Component} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import AddModelo from './components/AddModelo';
import Modelo from "./components/Modelo";
import ModelosList from './components/ModelosList';

import AddEmpregado from "./components/AddEmpregado";
import Empregado from "./components/Empregado";
import EmpregadosList from "./components/EmpregadosList";

import AddAviao from "./components/AddAviao";
import Aviao from "./components/Aviao";
import AvioesList from "./components/AvioesList";

import AddTeste from "./components/AddTeste";
import Teste from "./components/Teste";
import TestesList from "./components/TestesList";

import AddPeritoEm from "./components/AddPeritoEm";
import PeritoEm from "./components/PeritoEm";
import PeritoEmList from "./components/PeritoEmList";

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <a href="/modelos" className="navbar-brand">
            <b>AeroManage</b>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/modelos"} className="nav-link">
                Modelos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/avioes"} className="nav-link">
                Aviões
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/empregados"} className="nav-link">
                Empregados
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/testes"} className="nav-link">
                Testes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/perito_em"} className="nav-link">
                Perito em
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

            <Route path="/empregados" element={<EmpregadosList/>} />
            <Route path="/addEmpregado" element={<AddEmpregado/>} />
            <Route path="/empregados/:id" element={<Empregado/>} />

            <Route path="/avioes" element={<AvioesList/>} />
            <Route path="/addAviao" element={<AddAviao/>} />
            <Route path="/avioes/:id" element={<Aviao/>} />

            <Route path="/testes" element={<TestesList/>} />
            <Route path="/addTeste" element={<AddTeste/>} />
            <Route path="/testes/:id" element={<Teste/>} />

            <Route path="/perito_em" element={<PeritoEmList/>} />
            <Route path="/addPerito_em" element={<AddPeritoEm/>} />
            <Route path="/perito_em/:id" element={<PeritoEm/>} />
          </Routes>
        </div>
      </div>
    );
}

export default App;
