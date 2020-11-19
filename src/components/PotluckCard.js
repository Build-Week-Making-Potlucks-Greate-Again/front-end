import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    border: 7px solid ${pr => pr.theme.primaryColor};
    min-width: 25rem;
    max-width: 50rem;
    margin: 1rem 2rem;
`



const PotluckCard = (props) => {
    const { name, items, guests, date, time, location, setguestPotlucks} = props.potluckInfo
    const [moreDetails, setMoreDetails] = useState(false);
    const [ guestList, setGuestList ] = useState([])
    const [ foodItems, setFoodItems ] = useState(items);
    
    const onChange = e => {
        const { name, checked } = e.target;
        setFoodItems([...(foodItems.map(item => {
            if (item.foodName === name) {
                return {...item, selected: item.selected ? 0 : 1}
            }
            return item;
        }))]);
    }
    
    const getGuestItemList = (items) => {
        return items.map(item => 
            <span>
                <input type="checkbox" id={item.selectedBy} name={item.foodName} checked={onChange}/>
                <label for={item.foodName}>{item.foodName}</label>
            </span>
        )
    }

    const clickHandle = e => {
        console.log(items)
        if ((e.target.type === 'checkbox') || (e.target.type === 'submit')) { //need this conditional otherwise clicking on the checkbox leads to closing the card
            return null;
        } else {
            setMoreDetails(!moreDetails);
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
                        <form>
                            {foodItems.map(item => 
                                <span>
                                    <input type="checkbox" id={item.selectedBy} name={item.foodName} checked={item.selected} onChange={onChange}/>
                                    <label for={item.foodName}>{item.foodName}</label>
                                </span>
                            )}
                            <div>
                                <button>Submit</button>
                            </div>
                        </form>
                    }
                </div>}
        </StyledDiv>
    )
}

export default PotluckCard