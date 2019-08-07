import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <div>
            <Link to="/add-project" className="button is-dark">Add New Project</Link>
        </div>
    )
}