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

const dummyData = [{
    "user_id": 123456,
    "name":'Food For Me',
    "items":[
        {
            foodName: 'cheese',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'hot dogs',
            selected: 0,
            selectedBy: null
        },
        {
            foodName: 'dumplings',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'meat buns',
            selected: 0,
            selectedBy: null
        }
    ],
    "guests": [1234, 5468, 894],
    "date":'11-19-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
},
{
    "user_id": 123456,
    "name":'Food For You',
    "items":[
        {
            foodName: 'cheese',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'hot dogs',
            selected: 0,
            selectedBy: null
        },
        {
            foodName: 'dumplings',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'meat buns',
            selected: 0,
            selectedBy: null
        }
    ],
    "guests": [1234, 5468, 894],
    "date":'11-2-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
},
{
    "user_id": 123456,
    "name":'Food For Tommy',
    "items":[
        {
            foodName: 'cheese',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'hot dogs',
            selected: 0,
            selectedBy: null
        },
        {
            foodName: 'dumplings',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'meat buns',
            selected: 0,
            selectedBy: null
        }
    ],
    "guests": [1234, 5468, 894],
    "date":'11-05-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
}]
const dummyData2 = [{
    "user_id": 12345,
    "name":'Lilly',
    "items":[
        {
            foodName: 'cheese',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'hot dogs',
            selected: 0,
            selectedBy: null
        },
        {
            foodName: 'dumplings',
            selected: 1,
            selectedBy: 345
        },
        {
            foodName: 'meat buns',
            selected: 0,
            selectedBy: null
        }
    ],
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
        // load in potlucks that we are invited to
        // set potlucksList to 

        axiosWithAuth().get(`https://mplga-tt-webft-49.herokuapp.com/api/potlucks`)
        .then(res => {
            console.log(res)
            //separate potlucks to ones that we were invited to and ones that we are owners of?
        })
        .catch(err => {
            debugger
            console.log(err)
        })

        // searching for id of 1 example
        searchUserId(1).then(res => console.log(res))

    },[])
    return (
        <MainContainer className="potlucks-container">
            <div className='container'>
                <h3>My Potlucks</h3>
                <div className="my-potlucks">
                    {myPotlucks && (
                        myPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck} potluckStatus='my-potlucks'/>)
                    )}
                </div>
            </div>
            {/* {guestPotlucks && <span className='separating-line'/>} */}
            <div className='container'>
                <h3>My Friend's Potlucks</h3>
                <div className="guest-potlucks">
                    {guestPotlucks && (
                        guestPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck} setguestPotlucks={setguestPotlucks} potluckStatus='guest-potlucks'/>)
                    )}
                </div>
            </div>
        </MainContainer>
    )
}

export default PotlucksList