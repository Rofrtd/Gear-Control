import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/projects')
            setProjects(await response.json())
        })()
    }, [true])
    
    
    return (
        <div className="container">
            <center>
                <h1 className="title">OPEN PROJECTS</h1>
            </center>
            <div className="columns is-multiline"> 
                {projects.map((project) => (
                        <div key={project.id} className = "column is-one-quarter is-half-tablet">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">{project.name}</p>
                                </header>
                            <div className="card-content">
                                <div className="content">
                                    <strong>Customer:</strong> {project.customer_id} 
                                    <br/>
                                    <strong>START DATE:</strong> {project.start_date.slice(0, 10)}
                                    <br/>
                                    <strong>END DATE:</strong> {project.end_date.slice(0, 10)}
                                    <br/>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" className="card-footer-item">Edit</a>
                                <a href="#" className="card-footer-item">Close</a>
                            </footer>
                            </div>
                        </div>
                ))}
            </div>
            <Link to="/add-project" className="column button is-link is-large">
                <i className="fa fa-plus"></i>
            </Link>
        </div>
    )
}