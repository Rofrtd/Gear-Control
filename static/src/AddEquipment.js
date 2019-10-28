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
                    equipment_calibration_period: '6 months',
                    equipment_calibration_notification: false
                }}
                validationSchema={ProjectSchema}
                onSubmit={onSubmit(props.history)}
            >
                <Form>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Type:</label>
                        </div>
                        <div className="control">
                            <Field name="equipment_type" className="field input" type="text" placeholder="Type"/>
                        </div>
                        <ErrorMessage name="equipment_type"/>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Model:</label>
                        </div>
                        <div className="control">
                            <Field name="equipment_model" className="field input" type="text" placeholder="Model"/>
                        </div> 
                        <ErrorMessage name="equipment_model"/>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">S/N:</label>
                        </div>
                        <div className="control">
                            <Field name="equipment_serial_number" className="field input" type="text" placeholder="S/N"/> 
                        </div>
                        <ErrorMessage name="equipment_serial_number"/> 
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">ID:</label>
                        </div>
                        <div className="control">
                            <Field name="equipment_id" className="field input" type="text" placeholder="Equipment ID"/>
                        </div> 
                        <ErrorMessage name="equipment_id"/>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Last Calibration:</label>
                        </div>
                        <div className="control">
                            <Field type="date" className="field input" type="text" name="equipment_last_calibration_date"/>   
                        </div>
                        <ErrorMessage name="equipment_last_calibration_date"/> 
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label">Calibration Every:</label>
                        </div>
                        <div className="select">
                            <Field component="select" name="equipment_calibration_period">
                                <option>6 months</option>
                                <option>12 months</option>
                                <option>18 months</option>
                                <option>24 months</option>
                            </Field>
                        </div> 
                    </div>
                    <div className="field is-grouped">
                        <div className="checkbox">
                            <Field type="checkbox" value="equipment_calibration_notification" name="equipment_calibration_notification"/>
                        </div> 
                        <div className="control">
                            <label className="label">Receive calibration notification</label>
                        </div>
                    </div>
                    <button className="button" type="submit">Submit</button>
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