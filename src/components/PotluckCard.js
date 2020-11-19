import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    border: 7px solid ${pr => pr.theme.primaryColor};
    min-width: 25rem;
    max-width: 50rem;
    margin: 1rem 2rem;
`

const getGuestItemList = (items) => {
    return items.map(item => 
        <span>
            <input type="checkbox" id={item.selectedBy} name={item.foodName}/>
            <label for={item.foodName}>{item.foodName}</label>
        </span>
    )
}

const PotluckCard = (props) => {
    const { name, items, guests, date, time, location } = props.potluckInfo
    const [moreDetails, setMoreDetails] = useState(false);
    const [ guestList, setGuestList ] = useState([])

    const clickHandle = e => {
        if (e.target.type !== 'checkbox') { //need this conditional otherwise clicking on the checkbox leads to closing the card
            setMoreDetails(!moreDetails);
        } else {
            return null;
        }
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
                    {props.potluckStatus === 'my-potlucks' ? 
                        <p>{items.map((item) => `${item.foodName}, `)}</p> : 
                        getGuestItemList(items)}
                </div>}
        </StyledDiv>
    )
}

export default PotluckCard