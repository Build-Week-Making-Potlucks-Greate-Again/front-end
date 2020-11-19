import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    border: 7px solid ${pr => pr.theme.primaryColor};
    min-width: 25rem;
    max-width: 50rem;
    margin: 1rem 2rem;
`



const PotluckCard = (props) => {
    const { potluck_name, foodList, guestList, date, time, location, id, organizer} = props.potluckInfo
    const { submitEdit } = props
    const [moreDetails, setMoreDetails] = useState(false);
    // const [ guestList, setGuestList ] = useState([])
    const [ foodItems, setFoodItems ] = useState(foodList);
    
    const onChange = e => {
        const { name, checked } = e.target;
        setFoodItems([...(foodItems.map(item => {
            if (item.food_name === name) {
                
                return {...item, ['selected?']: item['selected?'] ? 0 : 1}
            }
            return item;
        }))]);
    }

    const onSubmit = e => {
        e.preventDefault()
        submitEdit(foodItems, id)
    }
    
    // const getGuestItemList = (items) => {
    //     return items.map(item => 
    //         <span>
    //             <input type="checkbox" id={item.selectedBy} name={item.food_name} checked={onChange}/>
    //             <label for={item.food_name}>{item.food_name}</label>
    //         </span>
    //     )
    // }

    const clickHandle = e => {
        // console.log(foodList)
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
            <h4>{`${potluck_name}`}</h4>
            <h6>{`Organizer: ${organizer}`}</h6>
            <p>{date}</p>
            {moreDetails && 
                <div>
                    <p>{time}</p>
                    <p>{location}</p>
                    {props.potluckStatus === 'my-potlucks' ? 
                        <p>{foodList.map((item) => `${item.food_name}, `)}</p> : 
                        <form onSubmit={onSubmit}>
                            {foodItems.map(item => 
                                <span key={item.food_name}>
                                    <input type="checkbox" id={item.selectedBy} name={item.food_name} checked={item['selected?']} onChange={onChange}/>
                                    <label for={item.food_name}>{item.food_name}</label>
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