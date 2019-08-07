import React from 'react';
import ReactDOM from 'react-dom';


function App() {
    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/"> 
                        <span className= "icon is-large"> 
                            <i className="fas fa-biohazard fa-3x"></i>
                        </span>
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar-menu" className="navbar-menu">
                    <a className="navbar-item">Home</a>
                </div>
            </nav>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
