import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
    equipment_type: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    equipment_model: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    equipment_serial_number: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    equipment_id: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    equipment_last_calibration_date: Yup.string()
        .min(2, "Too short!")
        .max(25, "Too long!")
        .required("Required!"),
    equipment_calibration_period: Yup.string()
        .min(2)
        .required("Select one!"),
})

function onSubmit (history) {
    return async (values) => {
        const response = await fetch('/api/add-equipment', {
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
            alert("Equipment not added!")
        }
    }
}

export default function AddEquipment (props){
    const [equipment, setEquipment] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/equipment')
            setEquipment(await response.json())
        })()
    }, [true])

    return (
        <div>
            <Formik 
                initialValues={{
                    equipment_type: '',
                    equipment_model: '',
                    equipment_serial_number: '',
                    equipment_id:'',
                    equipment_last_calibration_date: '',
                    equipment_calibration_period: ''

                }}
                validationSchema={ProjectSchema}
                onSubmit={onSubmit(props.history)}
            >
                <Form>
                    <label>Type:</label>
                    <Field name="equipment_type" placeholder="Type"/>
                    <ErrorMessage name="equipment_type"/>
                    <label>Model:</label>
                    <Field name="equipment_model" placeholder="Model"/>
                    <ErrorMessage name="equipment_model"/>
                    <label>S/N:</label>
                    <Field name="equipment_serial_number" placeholder="S/N"/>
                    <ErrorMessage name="equipment_serial_number"/>
                    <label>ID:</label>
                    <Field name="equipment_id" placeholder="Equipment ID"/>
                    <ErrorMessage name="equipment_id"/>
                    <label>Last Calibration:</label>
                    <Field type="date" name="equipment_last_calibration_date"/>
                    <ErrorMessage name="equipment_last_calibration_date"/>
                    <label>Calibration Every</label>
                    <Field component="select" name="equipment_calibration_period">
                        <option></option>
                        <option>6 months</option>
                        <option>12 months</option>
                        <option>18 months</option>
                        <option>24 months</option>
                    </Field>
                    <ErrorMessage name="equipment_calibration_period"/>
                    <Field type="checkbox" name="equipment_calibration_notification"/>
                    <label> Receive calibration reminder</label>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Model</th>
                        <th>S/N</th>
                        <th>Internal ID</th>
                        <th>Last Calibration</th>
                        <th>Calibration Period</th>
                        <th>Notification</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.id}</td>
                            <td>{equipment.type}</td>
                            <td>{equipment.model}</td>
                            <td>{equipment.serial_number}</td>
                            <td>{equipment.internal_id}</td>
                            <td>{equipment.last_calibration}</td>
                            <td>{equipment.calibration_period}</td>
                            <td>{equipment.notification}</td>
                            <td>{equipment.created_on}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}