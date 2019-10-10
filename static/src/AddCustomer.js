import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    country: Yup.string().required("Required!"),
    state: Yup.string().required("Required!"),
    suburb: Yup.string().required("Required!"),
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
            history.push("/add-project")
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
                    name: '',
                    country: '',
                    state: '',
                    street: '',
                    suburb: ''
                }}
                validationSchema={ProjectSchema}
                onSubmit={onSubmit(props.history)}
            >
                <Form>
                    <Field name="name" placeholder="Customer Name"/>
                    <ErrorMessage name="name" />
                    <Field component="select" name="country">
                        <option></option>
                        <option>Australia</option>
                    </Field>
                    <ErrorMessage name="country" />
                    <Field component="select" name="state">
                        <option></option>
                        <option>NSW</option>
                        <option>WA</option>
                        <option>QLD</option>
                        <option>SA</option>
                        <option>VIC</option>
                        <option>TAS</option>
                    </Field>
                    <ErrorMessage name="state" />
                    <Field name="street" placeholder="Street Address"/>
                    <Field name="suburb" placeholder="Suburb"/>
                    <ErrorMessage name="suburb" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Street</th>
                        <th>Suburb</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.created_on}</td>
                            <td>{customer.country}</td>
                            <td>{customer.state}</td>
                            <td>{customer.street}</td>
                            <td>{customer.suburb}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}