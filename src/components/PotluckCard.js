import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
    background: ${pr => pr.theme.secondaryColor};
    /* min-width: 25rem;
    max-width: 50rem; */
    width: 100%;
    padding: 1rem 0;
    /* margin: 0.5rem 2rem; */
    cursor: pointer;

    &:hover {
        background: ${pr => pr.theme.tertiaryColor};
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0% 10%;

        h4 {
            font-size: 1.3rem;
        }

    }

    .card-content {
        /* background: ${pr => pr.theme.primaryColor}; */
        margin: 1rem 1rem;
        text-align: left;


        border: thin black solid;
    }
`
const getDate = (date) => { // var data is passed as a str mm-dd-yyyy
    let dateArr = date.split('-');
    let day = dateArr[1].split('');
    let ending;

    if (day.length > 1)
        day = parseInt(day[day.length - 1]);
    else
        day = parseInt(dateArr[1]);

    if (day < 4) {
        ending = (day === 1 ? 'st' : 
                        day === 2 ? 'nd' :
                        'rd');
    } else {
        ending = 'th';
    }
     
    if (dateArr[0] === '1') {
        dateArr[0] = 'January';
    } else if (dateArr[0] === '2') {
        dateArr[0] = 'February';
    } else if (dateArr[0] === '3') {
        dateArr[0] = 'March';
    } else if (dateArr[0] === '4') {
        dateArr[0] = 'April';
    } else if (dateArr[0] === '5') {
        dateArr[0] = 'May';
    } else if (dateArr[0] === '6') {
        dateArr[0] = 'June';
    } else if (dateArr[0] === '7') {
        dateArr[0] = 'July';
    } else if (dateArr[0] === '8') {
        dateArr[0] = 'August';
    } else if (dateArr[0] === '9') {
        dateArr[0] = 'September';
    } else if (dateArr[0] === '10') {
        dateArr[0] = 'October';
    } else if (dateArr[0] === '11') {
        dateArr[0] = 'November';
    } else if (dateArr[0] === '12') {
        dateArr[0] = 'December';
    } else {
        dateArr[0] = null;
    }
    return `${dateArr[0]} ${dateArr[1]}${ending} of ${dateArr[2]}`;
}

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
        <CardContainer className='potluck-card' onClick={clickHandle}>
            <div className='card-header'>
                <h4>{`${name}`}</h4>
                <p>{getDate(date)}</p>
            </div>
            {moreDetails && 
                <div className='card-content'>
                    <p>{time}</p>
                    <p>{location}</p>
                    {props.potluckStatus === 'my-potlucks' ? 
                        <p>{items.map((item, i) => i !== items.length - 1 ? `${item.foodName}, ` : `${item.foodName}`)}</p> : 
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
        </CardContainer>
    )
}

export default PotluckCard