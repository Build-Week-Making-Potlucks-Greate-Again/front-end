import React, { useEffect, useState } from 'react'

const dummyData = [{
    "user_id": 123456,
    "name":'Tommy',
    "items":['hot dogs', 'dumplings', 'meat buns'],
    "guests": [1234, 5468, 894],
    "date":'11-19-2020',
    "time":'12:00 PM',
    "location":'Oakdale, Minnesota',
}]

const PotluckCard = (props) => {
    const { name, items, guests, date, time, location } = props.potluckInfo
    const [ guestList, setGuestList ] = useState([])

    useEffect(() => {
        // fetchGuests
        // should use guests id to get the name of the users and save to state
    },[])
    return (
        <div className="potluck-card">
            <p>{name}</p>
            <p>{date}</p>
            <p>{time}</p>
            <p>{location}</p>
            <p>{items}</p>
        </div>
    )
}

export default PotluckCard