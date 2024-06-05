import React from "react";
import { Link } from "react-router-dom";
import { useFilter } from "./Filterdata";


export default function Header() {

  const { themeMode, setThemeMode,modeName,setModeName } = useFilter();

  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
      <div className="container">
        <div>
          <a className="navbar-brand" href="#">
            <b>React Task</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse ms-4 w-100" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/' className="nav-link active">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="check">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => { return setThemeMode(e.target.checked),themeMode ? setModeName("light Mode") : setModeName("Dark Mode"); }} />
            <label className="form-check-label" style={{width:"80px",color:'black'}}>{modeName}</label>
          </div>
        </div>
      </div>
    </nav>
    <hr className='m-0 p-0' style={{ color: '#000000' }} />

  </>)
}