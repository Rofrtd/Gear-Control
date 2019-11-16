import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parse } from 'path';

function parseDate(isoDate){
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    const test = `${year}-${month}-${day}`
    console.log(test, isoDate)
    return test
}

export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/projects')
            setProjects(await response.json())
        })()
    }, [true])
    console.log(projects)
    const [allocation, setAllocation] = useState([])
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/equipment_allocation')
            setAllocation(await response.json())
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
                                    <strong>START DATE:</strong> {parseDate(project.start_date)}
                                    <br/>
                                    <strong>END DATE:</strong> {parseDate(project.end_date)}
                                    <br/>
                                    <strong>Equipment:</strong> {
                                        allocation
                                            .filter((e)=> e.project_id == project.id)
                                            .map((e, i)=><span key={i}> {e.equipment_id} <br/> </span> )
                                    }
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link to={`/edit-project/${project.id}`} className="card-footer-item">Edit</Link>
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