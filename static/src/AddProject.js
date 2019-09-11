import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom'

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(200, "Too long!")
        .required("Required!")
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
    return (
        <div>
        <Formik 
            initialValues={{
                name: ''
            }}
            validationSchema={ProjectSchema}
            onSubmit={onSubmit(props.history)}
        >
            <Form>
                <Field name="name" />
                <ErrorMessage name="name" />
                <button type="submit">Submit</button>
                <Link to="/add-customer" className="button is-link is-small">Add Customer</Link>
            </Form>
        </Formik>
        
        </div>
    )
}