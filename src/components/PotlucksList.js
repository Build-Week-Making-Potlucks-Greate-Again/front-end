import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {} from 'react-router-dom'

import axiosWithAuth from '../validation/AxiosAuthorization'
import { searchUserId, searchUsername } from '../utils/search'
import PotluckCard from './PotluckCard'

const MainContainer = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    /* background: ${pr => pr.theme.primaryColor}; */
    color: #ffffff;

    .separating-line {
        width:  90vw;
        margin: 2.5rem auto;
        border-bottom: 2px solid ${pr => pr.theme.secondaryColor};
    }

    .container {
        width: 50%;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        justify-content: center;
        /* padding: 1rem 0; */
    }

    .my-potlucks {
        width: 100%;
    }
    .guest-potlucks {
        width: 100%;
    }
    h3 {
        color: black;
        padding: 1rem 1rem;
    }
`

const PotlucksList = (props) => {
    const [ myPotlucks, setMyPotlucks] = useState([])
    const [ guestPotlucks, setguestPotlucks] = useState([])

    // useEffect to call api data from backend
    useEffect(() => {
        // load in potlucks that we have
        // load in potlucks that we are invited to
        // set potlucksList to 
        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/auth/users`)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/api/potlucks`)
        .then(res => {
            
            //separate potlucks to ones that we were invited to and ones that we are owners of?
            const user = localStorage.getItem('username')
            console.log(res.data)
            console.log(res.data.allPotlucks.filter(potluck => potluck.organizer === user))
            setMyPotlucks(res.data.allPotlucks.filter(potluck => potluck.organizer === user))

            console.log(res.data.allPotlucks.filter(potluck => potluck.guestList.some(guest => guest.username === user)))
            setguestPotlucks(res.data.allPotlucks.filter(potluck => potluck.guestList.some(guest => guest.username === user)))
            
        })
        .catch(err => {
            debugger
            console.log(err)
        })

        // searching for id of 1 example
        // searchUsername(localStorage.getItem('username')).then(res => console.log(res))

    },[])

    const submitEdit = (arrayOfFoods, id) => {

        setguestPotlucks(guestPotlucks.map(potluck => {
            if (potluck.id === id){
                return {...potluck, foodList:arrayOfFoods}
            }
            else {
                return potluck
            }
        }))
        console.log(guestPotlucks)
    }

    const deletePotluck = (id) => {
        setMyPotlucks(myPotlucks.filter(potluck => potluck.id !== id))
    }

    return (
        <MainContainer className="potlucks-container">
            <div className='container'>
                <h3>My Potlucks</h3>
                <div className="my-potlucks">
                    {myPotlucks && (
                    myPotlucks.map(potluck => 
                    <PotluckCard 
                    key={potluck.id+potluck.date} 
                    potluckInfo={potluck} 
                    deletePotluck={deletePotluck}
                    potluckStatus='my-potlucks'/>)
                )}
                </div>
            </div>
            {/* {guestPotlucks && <span className='separating-line'/>} */}
            <div className='container'>
                <h3>My Friend's Potlucks</h3>
                <div className="guest-potlucks">
                    {guestPotlucks && (
                    guestPotlucks
                    .map(potluck => 
                    <PotluckCard 
                    key={potluck.id+potluck.date} 
                    submitEdit={submitEdit}
                    potluckInfo={potluck} 
                    setguestPotlucks={setguestPotlucks} 
                    potluckStatus='guest-potlucks'/>)
                )}
                </div>
            </div>
        </MainContainer>
    )
}

export default PotlucksList