import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom'

const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too short!")
        .max(200, "Too long!")
        .required("Required!"),
    customer: Yup.string()
        .required("Required!"),
    equipmentIds: Yup.array().of(Yup.string())
        .min(1, "Select at least one!")
        
})

// function onSubmit (history) {
//     return async (values) => {
//         const response = await fetch(`/api/edit-project`, {
//             method: 'PUT', 
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(values)
//         })

//         if(response.ok){
//             history.push("/")
//         } else {
//             console.log(await response.json());
//             alert("Project not updated!")
//         }
//     }
// }

export default function EditProject (props){
    const {match: { params }} = props
    const [project, setProject] = useState([])
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/edit-project/${params.projectId}`)
            setProject(await response.json())
            
        })()
    }, [true])
    

    return (
        <div className="container">
            <center>
                <h1 className="title">EDIT PROJECT</h1>
            </center>
        <Formik 
            initialValues={props}
            enableReinitialize={true}
            validationSchema={ProjectSchema}
            // onSubmit={onSubmit(props.history)}
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
                                        {project.map((customer) =>(
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

                    <div className="columns level">
                        <label className="label column level-item">Allocate Equipment:</label>
                        <div className="column level-item">
                            <FieldArray
                                name="equipmentIds"
                                render={arrayHelpers => (
                                    <div>
                                    {/* {equipments.map((equipment) => (
                                        <div key={equipment.id}>
                                            <label className="label column level-item">
                                            <input
                                                name="equipmentIds"
                                                type="checkbox"
                                                value={equipment.id}
                                                checked={arrayHelpers.form.values.equipmentIds.includes(equipment.id)}
                                                onChange={e => {
                                                    if (e.target.checked) arrayHelpers.push(equipment.id);
                                                    else {
                                                        const idx = arrayHelpers.form.values.equipmentIds.indexOf(equipment.id);
                                                        arrayHelpers.remove(idx);
                                                    }
                                                }}
                                            />

        
                                                {" "} {equipment.internal_id}
                                            </label>
                                        </div>
                                        ))} */}
                                    </div>
                                    
                                )}/>

                        </div>
                        <ErrorMessage name="equipmentIds"/>
                    </div>
                </div>
                <div className="column"> {/* EMPTY */}</div>
            </div>           
                <button type="submit" className="button is-info" >Submit</button>
            </Form>
        </Formik>
        </div>
    )
}