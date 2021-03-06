import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import AddProject from './AddProject'
import AddCustomer from './AddCustomer'
import AddEquipment from './AddEquipment'
import EditProject from './EditProject'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div> 
                <Navbar /> 
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/add-project" exact component={AddProject} />
                    <Route path="/edit-project/:projectId" exact component={EditProject} />
                    <Route path="/add-customer" exact component={AddCustomer} />
                    <Route path="/add-equipment" exact component={AddEquipment} />
                    <Route component={() => (<span> 404 </span>)} />
                </Switch> 
            </div>
        </Router>
    )
}
