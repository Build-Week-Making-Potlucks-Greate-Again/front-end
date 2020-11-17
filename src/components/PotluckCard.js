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
    const [moreDetails, setMoreDetails] = useState(false);
    const [ guestList, setGuestList ] = useState([])

    const clickHandle = e => {
        setMoreDetails(!moreDetails);
    }        

    useEffect(() => {
        // fetchGuests
        // should use guests id to get the name of the users and save to state
    },[])
    return (
        <StyledDiv className='potluck-card' onClick={clickHandle}>
            <h4>{`${name}'s Potluck`}</h4>
            <p>{date}</p>
            {moreDetails && 
                <div>
                    <p>{time}</p>
                    <p>{location}</p>
                    <p>{items.join(', ')}</p>
                </div>}
        </StyledDiv>
    )
}

export default PotluckCard