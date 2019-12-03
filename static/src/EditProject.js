import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';

function parseDate(isoDate){
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    const test = `${year}-${month}-${day}`
    return test
}
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

function onSubmit (history, projectId) {
    return async (values) => {
        const response = await fetch(`/api/edit-project/${projectId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        if(response.ok){
            history.push("/")
        } else {
            console.log(await response.json());
            alert("Project not updated!")
        }
    console.log(values, history)
    }
    
}

export default function EditProject (props){
    const {match: { params }} = props
    const [project, setProject] = useState({equipment:[]})
    const customer = project.customer_name  
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/edit-project/${params.projectId}`)
            setProject(await response.json().then(data => data.project))
        })()
    }, [true])
    console.log(project)

    const [equipments, setEquipments] = useState([])
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/equipment')
            setEquipments(await response.json())
        })()
    }, [true])

   return (
        <div className="container">
            <center>
                <h1 className="title">EDIT PROJECT</h1>
            </center>
        <Formik 
            initialValues={{
                name: project.name || "",
                customer: project.customer_name,
                start_date: parseDate(project.start_date),
                end_date: parseDate(project.end_date),
                equipmentIds: project.equipment.map(e => e.id)
            }}
            enableReinitialize={true}
            validationSchema={ProjectSchema}
            onSubmit={onSubmit(props.history, params.projectId)}
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
                                    <Field component="select" name="customer" disabled>
                                        <option>{customer}</option>
                                    </Field>
                                </span>
                            <ErrorMessage name="customer" />
                        </div>
                    </div>
                    <div className="columns level">
                        <label className="label column level-item">Start Date:</label>
                        <div className="control column level-item">
                            <Field type="date" name="start_date" className="field input" placeholder="Start Date" />
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
                                    {equipments.map((equipment) => (
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
                                        ))}
                                    </div>
                                    
                                )}/>

                        </div>
                        <ErrorMessage name="equipmentIds"/>
                    </div>
                </div>
                <div className="column"> </div>
            </div>           
                <button type="submit" className="button is-info" >Submit</button>
            </Form>
        </Formik>
        </div>
    )
}
