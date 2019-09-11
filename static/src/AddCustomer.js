import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!")
})

function onSubmit (history) {
    return async (values) => {
        const response = await fetch('/api/add-customer', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        if(response.ok){
            history.push("/add-customer")
        } else {
            console.log(await response.json());
            alert("Customer not added!")
        }
    }
}

export default function AddCustomer (props){
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
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.created_on}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}