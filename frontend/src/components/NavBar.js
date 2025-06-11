import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary fix-navbar">
          <a href="/" className="navbar-brand">
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
    </div>
  );
};

export default NavBar;
