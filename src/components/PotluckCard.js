import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    border: 7px solid grey;
    min-width: 25rem;
    max-width: 50rem;
    margin: 0 2rem;
`

const PotluckCard = (props) => {
    const { name, items, guests, date, time, location } = props.potluckInfo
    const [ guestList, setGuestList ] = useState([])

    useEffect(() => {
        // fetchGuests
        // should use guests id to get the name of the users and save to state
    },[])
    return (
        <StyledDiv className="potluck-card">
            <p>{name}</p>
            <p>{date}</p>
            <p>{time}</p>
            <p>{location}</p>
            <p>{items.join(', ')}</p>
        </StyledDiv>
    )
}

export default PotluckCard