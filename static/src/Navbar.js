import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item"> 
                        <span className= "icon is-large"> 
                            <i className="fas fa-biohazard fa-3x"></i>
                        </span>
                    </Link>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar-menu" className="navbar-menu">
                    <Link to="/" className="navbar-item">Home</Link>
                </div>
            </nav>
    )
}