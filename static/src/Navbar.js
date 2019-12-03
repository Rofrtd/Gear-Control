import React from 'react';
import {Link} from "react-router-dom";
import logo from './logo.svg'; 

export default function Navbar() {
    return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item"> 
                        <img src={logo}/>
                    </Link>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="true" data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar-menu" className="navbar-menu">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="/add-equipment" className="navbar-item">Equipment</Link>
                    <Link to="/" className="navbar-item">
                            <i className="fas fa-bell"></i> 
                    </Link>
                </div>
            </nav>
    )
}