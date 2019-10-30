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
        <div className="container">
            <center>
                <h1 className="title">ADD NEW CUSTOMER</h1>
            </center>
            <Formik 
                initialValues={{
                    name: '',
                    country: 'Australia',
                    state: 'NSW',
                    street: '',
                    suburb: ''
                }}
                validationSchema={ProjectSchema}
                onSubmit={onSubmit(props.history)}
            >
                <Form>

                <div className="columns">
					<div className="column">
						<div className="columns level">
							<label className="label column level-item">Name:</label>
							<div className="control column level-item">
								<Field name="name" className="field input" type="text" placeholder="Customer Name"/>
							</div>
                            <ErrorMessage name="name" />
                        </div>
                        <div className="columns level">
                            <label className="label column level-item">Country:</label>
                            <div className="control column level-item">
                                <div className="select">
                                    <Field name="country" className="field input" type="text" component="select" >
                                        <option>Australia</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="columns level">
                            <label className="label column level-item">State:</label>
                            <div className="control column level-item">
                                <div className="select">
                                    <Field name="state" className="field input" type="text" component="select">
                                        <option>NSW</option>
                                        <option>WA</option>
                                        <option>QLD</option>
                                        <option>SA</option>
                                        <option>VIC</option>
                                        <option>TAS</option>
                                    </Field>
                                </div>
                                <ErrorMessage name="state" />
                            </div>
                        </div>
                        <div className="columns level">
                            <label className="label column level-item">Sreet Address:</label>
                            <div className="control column level-item">
                                <Field name="street" className="field input" type="text" placeholder="Street Address"/>
                            </div>
                        </div>
                        <div className="columns level">
                            <label className="label column level-item">Suburb:</label>
                            <div className="control column level-item">
                                <Field name="suburb" className="field input" type="text" placeholder="Suburb"/>
                            </div>
                        </div>
                        <ErrorMessage name="suburb" />
                    </div>

                    <div className="column">
                        {/* EMPTY */}
                    </div> 
                </div>
                <button className="button is-info" type="submit">Submit</button>
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