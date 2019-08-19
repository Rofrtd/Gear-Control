import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

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
        }
    }
}

export default function AddProject (props){
    return (
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
            </Form>
        </Formik>
    )
}