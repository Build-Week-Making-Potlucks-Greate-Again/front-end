import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {} from 'react-router-dom'

import axiosWithAuth from '../validation/AxiosAuthorization'
import { searchUserId, searchUsername } from '../utils/search'
import PotluckCard from './PotluckCard'

const MainContainer = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    .separating-line {
        width:  90vw;
        margin: 2.5rem auto;
        border-bottom: 2px solid ${pr => pr.theme.primaryColor};
    }

    .container {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
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

    return (
        <MainContainer className="potlucks-container">
            <h3>My Potlucks</h3>
            <div className="my-potlucks container">
                {myPotlucks && (
                    myPotlucks.map(potluck => <PotluckCard key={potluck.id+potluck.date} potluckInfo={potluck} potluckStatus='my-potlucks'/>)
                )}
            </div>
            {guestPotlucks && <span className='separating-line'/>}
            <h3>My Friend's Potlucks</h3>
            <div className="guest-potlucks container">
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
        </MainContainer>
    )
}

export default PotlucksList