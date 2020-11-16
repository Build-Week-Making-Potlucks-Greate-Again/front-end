import React, { useEffect, useState } from 'react'
import {} from 'react-router-dom'

import PotluckCard from './PotluckCard'

const dummyData = [{
    "user_id": 123456,
    "name":'Tommy',
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
        // load in potlucks that we are invited to
        // set potlucksList to 
    },[])
    return (
        <div className="potlucks-container">
            <p>Potlucks Container</p>
            <div className="my-potlucks container">
                {myPotlucks && (
                    myPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck}/>)
                )}
            </div>
            <div className="guest-potlucks container">
                {guestPotlucks && (
                    guestPotlucks.map(potluck => <PotluckCard key={potluck.user_id+potluck.name} potluckInfo={potluck}/>)
                )}
            </div>
        </div>
    )
}

export default PotlucksList