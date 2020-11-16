import React, {useState} from 'react'

import CreateForm from '../components/CreateForm'

function CreatePotLucks() {

    const initialForum = {
        name: '',
        PotLuckName: '',
        food: ['app']
    }

    const [createForm, setCreateForm] = useState(initialForum)

    const formChange = (name,value) => {
        setCreateForm({
            ...createForm,
            [name]: value
        })
    }

    const formSubmit = () => {
        console.log('submited')
    }






    return (
        <div>
            <h1>Creaate Put lucks</h1>
            <div className="form-container">
                <CreateForm values={createForm} change={formChange} />
            </div>
        </div>
    )
}

export default CreatePotLucks
