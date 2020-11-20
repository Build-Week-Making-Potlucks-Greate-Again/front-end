import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FormContainer} from './CreatePotLuckStyle'

import { searchUsername, searchUserId } from '../utils/search'
import axiosWithAuth from '../validation/AxiosAuthorization'
import CreateForm from '../components/CreateForm'

function CreatePotLucks() {

    const initialForm = {
    name: "",
    date: "",
    time: "",
    location: "",
    PotLuckName: "",
    food: [],
    guestList: []
    };

    const [formValues, setFormValues] = useState(initialForm);
    const [potData , setPotData] = useState([])
    const [ guestId, setGuestId ] = useState([])

    const formChange = (name, values) => {
        // console.log(name, values);
        if (name === "food") {
            setFormValues({
            ...formValues,
            [name]: [...formValues.food, values]
            });
        } else if(name === "guestList"){
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
        axios.post('https://jsonbox.io/box_079975f97939d478f372', newPotLuck)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        axiosWithAuth().post(`https://mplga-tt-webft-49.herokuapp.com/api/potluck`, newPotLuck)
        .then(res => console.log(res.data))
        .catch(err => {
            debugger
            console.log(`Unable to Post Potluck`)
        })

        

        setFormValues(initialForm);
    };

    useEffect(() => {
        axios.get('https://jsonbox.io/box_079975f97939d478f372')
            .then(res => setPotData(res.data))
            .catch(err => console.log(err))

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
        <h2>Getto Forum</h2>
        <CreateForm
        values={formValues}
        change={formChange}
        submit={formSubmit}
        formValues={setFormValues}
        guestId={guestId}
        setGuestId={setGuestId}
        />
        {/* <div className="test">
                        <h1>Test Data here babie</h1>
            {
                potData.map(data => {
                    return(
                        <div>
                            <h4>PotLuckName: {data.PotLuckName}</h4>
                            <h5>Food list</h5>
                            {
                                data.food.map(food => {
                                    return <p>{food}</p>
                                })
                            }
                            <h6>People: {data.guestList.length} </h6>
                            {
                                data.guestList.map( pe => {
                                    return <p>{pe}</p>
                                })
                            }
                        </div>
                    )
                })
            }
        </div> */}
    </FormContainer>
    );
    }
export default CreatePotLucks
