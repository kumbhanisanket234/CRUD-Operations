import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
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
      </div>
    </nav>
    <hr className='m-0 p-0' style={{ color: '#000000' }} />

  </>)
}