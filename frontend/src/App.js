import React, {Component} from "react"
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";

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
      <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
  );
}

export default App;
