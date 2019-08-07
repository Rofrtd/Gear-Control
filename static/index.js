import React from 'react';
import ReactDOM from 'react-dom';


function App() {
    return (
        <div> <section className="section">
            <div className="container">
                <h1 className="title">Hello World</h1>
                <p className="subtitle">My first website with <strong>Bulma</strong>! </p>
            </div>
        </section>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
