import React from "react";
import { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
          <a className="navbar-brand" href="#">Share Market</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" data-toggle="modal">
                  Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="modal">
                  Chart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="modal">
                  <i className="fa fa-fw fa-sign-out"></i>Logout</a>
              </li>

            </ul>
          </div>
        </nav>
      </div>

    );
  }
}

export default Header;
