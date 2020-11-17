import React, {useState} from 'react'
import { FormContainer } from './CreatePotLuckStyle'

import CreateForm from '../components/CreateForm'



function CreatePotLucks() {

    /* 
        Below is the initial Forum
            Name: string
            potLuckName: string
            food: array
            date: string
            time: string
            location: string
    */

    const initialForum = {
        name: '',
        potLuckName: '',
        food: [],
        date: '',
        time: '',
        location: ''
    }
    // This creates a forum using the initalforum as a base
    const [createForm, setCreateForm] = useState(initialForum)
    // This sets the food array starting with a blank array
    const [comida, setComida] = useState([])


    /*
        This takes the value passed from CreatForm.js and sets the array of food with the old values and adds the new value
    */
    const foodUpdate = (value) => {
        setComida([
            ...comida,
            value
        ])
    }

    // This takes the values passed from createform.js and makes a form
    const formChange = (name,value) => {
        setCreateForm({
            ...createForm,
            [name]: value
        })
    }

    // This creates a new potLuck form
    const formSubmit = () => {
        const newPotLuck = {
            name: createForm.name,
            potLuckName: createForm.potLuckName,
            date: createForm.date ,
            time: createForm.time ,
            location: createForm.location,
            food: comida
        }
        setCreateForm(initialForum)
        setComida([])
        console.log(newPotLuck)
    }

    return (
        <div>
            <h1>Creaate Put lucks</h1>
            <FormContainer>
                {/* Here props are passed into the CreateForm.js to communicate with the functions on this page */}
                <CreateForm values={createForm} change={formChange} food={foodUpdate} submitForm={formSubmit} comida={comida}/>
            </FormContainer>
        </div>
    )
}

export default CreatePotLucks
