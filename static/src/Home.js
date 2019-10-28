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
        <div>
            <div className="columns is-multiline"> 
                {projects.map((project) => (
                        <div key={project.id} className = "column is-one-quarter is-half-tablet">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">{project.name}</p>
                                </header>
                            <div className="card-content">
                                <div className="content">
                                    ID: {project.id} 
                                    <br/>
                                    NAME: {project.name}
                                    <br/>
                                    CREATED ON: {project.created_on}
                                    <br/>
                                    Customer: {project.customer_id}
                                    <br/>
                                    START DATE: {project.start_date}
                                    <br/>
                                    END DATE: {project.end_date}
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