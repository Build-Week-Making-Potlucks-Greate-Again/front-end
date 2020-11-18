import React, {useState} from 'react'

import CreateForm from '../components/CreateForm'



function CreatePotLucks() {

    const initialForm = {
        name: "",
        date: "",
        time: "",
        PotLuckName: "",
        food: []
        };

    const [formValues, setFormValues] = useState(initialForm);

    const formChange = (name, values) => {
        console.log(name, values);
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

    const formSubmit = (e) => {
        e.preventDefault();
        const newPotLuck = {
            name: formValues.name,
            date: formValues.date,
            time: formValues.time,
            PotLuckName: formValues.PotLuckName,
            food: formValues.food
        };
        console.log(newPotLuck);
        setFormValues(initialForm);
    };

    return (
        <div className="App">
            <h2>Getto Forum</h2>
            <CreateForm values={formValues} change={formChange} submit={formSubmit} />
        </div>
    );
    }
export default CreatePotLucks
