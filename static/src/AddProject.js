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
                <Field name="name" placeholder="Project Name" />
                <ErrorMessage name="name" />
                <label>Customer:</label>
                <Field component="select" name="customer">
                    <option></option>
                    {customers.map((customer) =>(
                        <option key={customer.id}>{customer.name}</option>
                    ))}
                </Field>
                <ErrorMessage name="customer" />
                <Link to="/add-customer" className="button is-link is-small">Add Customer</Link>
                <label>Start Date:</label>
                <Field type="date" name="start_date" placeholder="Start Date" />
                <ErrorMessage name="start_date" />
                <label>End Date:</label>
                <Field type="date" name="end_date" placeholder="End Date" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
    )
}