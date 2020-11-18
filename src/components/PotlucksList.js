import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import axiosWithAuth from '../validation/AxiosAuthorization'
import {} from 'react-router-dom'

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

const dummyData = [{
    "user_id": 123456,
    "name":'Food For Me',
    "items":['hot dogs', 'dumplings', 'meat buns'],
    "guests": [1234, 5468, 894],
    "date":'11-19-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
},
{
    "user_id": 123456,
    "name":'Food For You',
    "items":['hot dogs', 'dumplings', 'meat buns'],
    "guests": [1234, 5468, 894],
    "date":'11-19-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
},
{
    "user_id": 123456,
    "name":'Food For Tommy',
    "items":['hot dogs', 'dumplings', 'meat buns'],
    "guests": [1234, 5468, 894],
    "date":'11-19-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
}]
const dummyData2 = [{
    "user_id": 12345,
    "name":'Lilly',
    "items":['cheese burgers', 'pizza', 'turkey'],
    "guests": [123456, 54628, 894],
    "date":'11-22-2020',
    "time":'9:00 PM',
    "location":'St. Cloud, Minnesota',
}]

const PotlucksList = (props) => {
    const [ myPotlucks, setMyPotlucks] = useState(dummyData)
    const [ guestPotlucks, setguestPotlucks] = useState(dummyData2)

    // useEffect to call api data from backend
    useEffect(() => {
        // load in potlucks that we have

        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/api/potlucks`)
        .then(res => {
            console.log(res)
            //separate potlucks to ones that we were invited to and ones that we are owners of?
        })
        .catch(err => {
            debugger
            console.log(err)
        })

    },[])

    return (
        <MainContainer className="potlucks-container">
            <h3>My Potlucks</h3>
            <div className="my-potlucks container">
                {myPotlucks && (
                    myPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck} potluckStatus='my-potlucks'/>)
                )}
            </div>
            {guestPotlucks && <span className='separating-line'/>}
            <h3>My Friend's Potlucks</h3>
            <div className="guest-potlucks container">
                {guestPotlucks && (
                    guestPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck} potluckStatus='guest-potlucks'/>)
                )}
            </div>
        </MainContainer>
    )
}

export default PotlucksList