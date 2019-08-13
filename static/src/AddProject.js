import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(200, "Too long!")
        .required("Required!")
})

export default function AddProject (){
    return (
        <Formik 
            initialValues={{
                name: ''
            }}
            validationSchema={ProjectSchema}
            onSubmit={
                (values) => fetch('/api/add-project', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values), 
                })}
        >
            <Form>
                <Field name="name" />
                <ErrorMessage name="name" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}