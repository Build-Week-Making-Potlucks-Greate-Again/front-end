import React, {useState} from 'react'
import {FormContainer} from './CreatePotLuckStyle'

import CreateForm from '../components/CreateForm'



function CreatePotLucks() {

const initialForm = {
    name: "",
    date: "",
    time: "",
    location: "",
    PotLuckName: "",
    food: []
    };

    const [formValues, setFormValues] = useState(initialForm);

    const formChange = (name, values) => {
    // console.log(name, values);
    if (name === "food") {
        setFormValues({
        ...formValues,
        [name]: [...formValues.food, values]
        });
    } else {
        setFormValues({
        ...formValues,
        [name]: values
        });
    }
    };

    const formSubmit = () => {
    const newPotLuck = {
        name: formValues.name,
        date: formValues.date,
        time: formValues.time,
        location: formValues.location,
        PotLuckName: formValues.PotLuckName,
        food: formValues.food
    };

    console.log(newPotLuck);

    setFormValues(initialForm);
    };

    return (
    <FormContainer>
        <h2>Getto Forum</h2>
        <CreateForm
        values={formValues}
        change={formChange}
        submit={formSubmit}
        formValues={setFormValues}
        />
    </FormContainer>
    );
    }
export default CreatePotLucks
