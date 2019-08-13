import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="columns">
            <Link to="/add-project" className="button column is-link is-large">Add New Project</Link>
        </div>
    )
}