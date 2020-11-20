import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FormContainer} from './CreatePotLuckStyle'

import { searchUsername, searchUserId } from '../utils/search'
import axiosWithAuth from '../validation/AxiosAuthorization'
import CreateForm from '../components/CreateForm'

function CreatePotLucks() {

    const initialForm = {
    name: getData(),
    date: "",
    time: "",
    location: "",
    PotLuckName: "",
    food: [],
    guestList: []
    };
 
    const [formValues, setFormValues] = useState(initialForm);

    const [ guestId, setGuestId ] = useState([])

    const formChange = (name, values) => {
        // console.log(name, values);
        if (name === "food") {
            setFormValues({
            ...formValues,
            [name]: [...formValues.food, values]
            });
        } else if(name === "guestList"){
            console.log(name,'<-name', values, '<-value')
            setFormValues({
                ...formValues,
                [name]: [...formValues.guestList, values]
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
            potluck_name: formValues.PotLuckName,
            date: formValues.date,
            time: formValues.time,
            location: formValues.location,
            potluck_organizer: formValues.name,
            guest_list: guestId,
            food_items: formValues.food
        }

        console.log(newPotLuck);

        // Network Connection 

        axiosWithAuth().post(`https://mplga-tt-webft-49.herokuapp.com/api/potluck`, newPotLuck)
        .then(res => console.log(res.data))
        .catch(err => {
            // debugger
            console.log(`Unable to Post Potluck`)
            console.log(err)
        })

        

        setFormValues(initialForm);
    };

    function getData(){
        return window.localStorage.getItem('username')
    }


    useEffect(() => {
        searchUsername(localStorage.getItem('username'))
        .then(res => {
            setFormValues({...formValues, name:res.id})
        })
        .catch(err => {
            console.log(`could not fetch username from localStorage`)
        })
    },[])

    return (
    <FormContainer>
        <h2>Potluck Form</h2>
        <CreateForm
        values={formValues}
        change={formChange}
        submit={formSubmit}
        formValues={setFormValues}
        guestId={guestId}
        setGuestId={setGuestId}
        />
    </FormContainer>
    );
    }
export default CreatePotLucks
