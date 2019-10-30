import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom'

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(200, "Too long!")
        .required("Required!"),
    customer: Yup.string()
        .required("Required!"),
})

function onSubmit (history) {
    return async (values) => {
        const response = await fetch('/api/add-project', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        if(response.ok){
            history.push("/")
        } else {
            console.log(await response.json());
            alert("Project not added!")
        }
    }
}

export default function AddProject (props){
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/customers')
            setCustomers(await response.json())
        })()
    }, [true])

    return (
        <div className="container">
            <center>
                <h1 className="title">ADD NEW PROJECT</h1>
            </center>
        <Formik 
            initialValues={{
                name: '',
                customer:'',
                start_date:'',
                end_date: ''
            }}
            validationSchema={ProjectSchema}
            onSubmit={onSubmit(props.history)}
        >
            <Form>

            <div className="columns">
                <div className="column">
                    <div className="columns level">
                        <label className="label column level-item">Project name:</label>
                        <div className="control column level-item">
                            <Field name="name" className="field input" type="text" placeholder="Project Name" />
                        </div>
                        <ErrorMessage name="name"/>
                    </div>
                    <div className="columns level">
                        <label className="label column level-item">Customer:</label>
                        <div className="field has-addons column level-item">
                                <span className="select is-info is-small">
                                    <Field component="select" name="customer">
                                        <option></option>
                                        {customers.map((customer) =>(
                                            <option value={customer.id} key={customer.id}>{customer.name}</option>
                                        ))}
                                    </Field>
                                </span>
                            <div className="control">
                                <Link to="/add-customer" className="button is-small">Add Customer</Link>
                            </div>
                            <ErrorMessage name="customer" />
                        </div>
                    </div>
                    <div className="columns level">
                        <label className="label column level-item">Start Date:</label>
                        <div className="control column level-item">
                            <Field  type="date" name="start_date" className="field input" placeholder="Start Date" />
                        </div>
                        <ErrorMessage name="start_date" />
                    </div>
                    <div className="columns level">
                        <label className="label column level-item">End Date:</label>
                        <div className="control column level-item">
                            <Field type="date" name="end_date" className="field input" placeholder="End Date" />
                        </div>
                    </div>
                        


                </div>
                <div className="column"></div>


            </div>           

                
                
                <button type="submit" className="button is-info" >Submit</button>
            </Form>
        </Formik>
        </div>
    )
}