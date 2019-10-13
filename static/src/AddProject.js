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
        <div>
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
                <div className="field is-grouped">
                    <div className="control">
                        <label className="label">Project name:</label>
                    </div>
                    <div className="control">
                        <Field name="name" className="field input" type="text" placeholder="Project Name" />
                        <ErrorMessage name="name" />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <label className="label">Customer:</label>
                    </div>
                    <div className="field has-addons">
                        <div className="control">
                            <span className="select is-info is-small">
                                <Field component="select" name="customer">
                                    <option></option>
                                    {customers.map((customer) =>(
                                        <option key={customer.id}>{customer.name}</option>
                                    ))}
                                </Field>
                            </span>
                        </div>
                        <div className="control">
                            <Link to="/add-customer" className="button is-small">Add Customer</Link>
                        </div>
                    </div>
                    <ErrorMessage name="customer" />
                </div>
                <div className="field is-grouped">
                    <label className="label">Start Date:</label>
                    <Field type="date" name="start_date" placeholder="Start Date" />
                    <ErrorMessage name="start_date" />
                </div>
                <div className="field is-grouped">
                    <label className="label">End Date:</label>
                    <Field type="date" name="end_date" placeholder="End Date" />
                </div>
                <button type="submit" className="button is-info" >Submit</button>
            </Form>
        </Formik>
        </div>
    )
}