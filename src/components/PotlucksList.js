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

// const dummyData = [{
//     "user_id": 123456,
//     "name":'Food For Me',
//     "items":[
//         {
//             foodName: 'cheese',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'hot dogs',
//             selected: 0,
//             selectedBy: null
//         },
//         {
//             foodName: 'dumplings',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'meat buns',
//             selected: 0,
//             selectedBy: null
//         }
//     ],
//     "guests": [1234, 5468, 894],
//     "date":'11-19-2020',
//     "time":'12:00 PM',
//     "location":'Oakdale, Minnesota',
// },
// {
//     "user_id": 123456,
//     "name":'Food For You',
//     "items":[
//         {
//             foodName: 'cheese',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'hot dogs',
//             selected: 0,
//             selectedBy: null
//         },
//         {
//             foodName: 'dumplings',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'meat buns',
//             selected: 0,
//             selectedBy: null
//         }
//     ],
//     "guests": [1234, 5468, 894],
//     "date":'11-19-2020',
//     "time":'12:00 PM',
//     "location":'Oakdale, Minnesota',
// },
// {
//     "user_id": 123456,
//     "name":'Food For Tommy',
//     "items":[
//         {
//             foodName: 'cheese',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'hot dogs',
//             selected: 0,
//             selectedBy: null
//         },
//         {
//             foodName: 'dumplings',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'meat buns',
//             selected: 0,
//             selectedBy: null
//         }
//     ],
//     "guests": [1234, 5468, 894],
//     "date":'11-19-2020',
//     "time":'12:00 PM',
//     "location":'Oakdale, Minnesota',
// }]
// const dummyData2 = [{
//     "user_id": 12345,
//     "name":'Lilly',
//     "items":[
//         {
//             foodName: 'cheese',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'hot dogs',
//             selected: 0,
//             selectedBy: null
//         },
//         {
//             foodName: 'dumplings',
//             selected: 1,
//             selectedBy: 345
//         },
//         {
//             foodName: 'meat buns',
//             selected: 0,
//             selectedBy: null
//         }
//     ],
//     "guests": [123456, 54628, 894],
//     "date":'11-22-2020',
//     "time":'9:00 PM',
//     "location":'St. Cloud, Minnesota',
// }]

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
            
        })
        .catch(err => {
            debugger
            console.log(err)
        })

        // searching for id of 1 example
        searchUsername(localStorage.getItem('username')).then(res => console.log(res))

    },[])
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
                    guestPotlucks.map(potluck => <PotluckCard key={potluck.id+potluck.date} potluckInfo={potluck} setguestPotlucks={setguestPotlucks} potluckStatus='guest-potlucks'/>)
                )}
            </div>
        </MainContainer>
    )
}

export default PotlucksList