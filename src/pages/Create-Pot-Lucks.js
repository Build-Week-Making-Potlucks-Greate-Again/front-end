import React, {useState} from 'react'
import { FormContainer } from './CreatePotLuckStyle'

import CreateForm from '../components/CreateForm'

function CreatePotLucks() {

    const initialForum = {
        name: '',
        PotLuckName: '',
        food: []
    }

    const [createForm, setCreateForm] = useState(initialForum)
    const [comida, setComida] = useState([])

    const foodUpdate = (value) => {
        setComida([
            ...comida,
            value
        ])
        console.log(value)
    }

    const formChange = (name,value) => {
        setCreateForm({
            ...createForm,
            [name]: value
        })
    }

    const formSubmit = () => {
        const newPotLuck = {
            name: createForm.name.trim(),
            potLuckName: createForm.potLuckName.trim(),
            food: comida
        }
        console.log(newPotLuck)
    }






    return (
        <div>
            <h1>Creaate Put lucks</h1>
            <FormContainer>
                <CreateForm values={initialForum} change={formChange} food={foodUpdate} submitForm={formSubmit}/>
            </FormContainer>
        </div>
    )
}

export default CreatePotLucks
