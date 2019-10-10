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
            <Link to="/add-project" className="button is-link is-large">Add New Project</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.created_on}</td>
                            <td>{project.customer_id}</td>
                            <td>{project.start_date}</td>
                            <td>{project.end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}