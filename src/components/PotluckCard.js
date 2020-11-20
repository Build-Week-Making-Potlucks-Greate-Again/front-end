import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as FaIcons from "react-icons/fa";

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

const initialFoodObject = {
    "food_name":'',
    "selected?":0,
    "selected_by":null,
}

const PotluckCard = (props) => {
    const {
      potluck_name,
      foodList,
      guestList,
      date,
      time,
      location,
      id,
      organizer,
    } = props.potluckInfo;
    const { submitEdit, deletePotluck } = props;
    const [moreDetails, setMoreDetails] = useState(false);
    const [ editValues, setEditValues ] = useState(props.potluckInfo)
    const [edit, setEdit] = useState(false);
    const [foodItems, setFoodItems] = useState(foodList);
    const [ addFood, setAddFood] = useState(initialFoodObject)
  
    const onChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (type === 'checkbox') {
          setFoodItems([
              ...foodItems.map((item) => {
                if (item.food_name === name) {
                  return {
                    ...item,
                    ["selected?"]: item["selected?"] ? 0 : 1,
                    selected_by:
                      item.selected_by === null
                        ? localStorage.getItem("username")
                        : null,
                  };
                }
                return item;
              }),
            ]);
      }
      else if( name === 'food_name') {
          setAddFood({...addFood, [name]:value})
      }
        else {
            setEditValues({...editValues, [name]:value})
        }    
};

const onSubmit = (e) => {
  e.preventDefault();
  submitEdit(foodItems, id);
};

const onDelete = (e) => {
  e.preventDefault();
  deletePotluck(id);
};

const editPotluck = (e) => {
  e.preventDefault();
  setEdit(!edit);
};    
const saveEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

const addFoodItem = (e) => {
    e.preventDefault()

    console.log(addFood.food_name)
    setFoodItems([...foodItems, addFood])
    setAddFood(initialFoodObject)
}

const deleteFoodItem = (e) => {
    e.preventDefault(e)
    
    const item_name = e.target.parentNode.parentNode.parentNode.innerText
    console.log(item_name)
    setFoodItems(foodItems.filter(foodItem => foodItem.food_name !== item_name))
}

  // const getGuestItemList = (items) => {
  //     return items.map(item =>
  //         <span>
  //             <input type="checkbox" id={item.selectedBy} name={item.food_name} checked={onChange}/>
  //             <label for={item.food_name}>{item.food_name}</label>
  //         </span>
  //     )
  // }

  const clickHandle = (e) => {
    // console.log(foodList)
    if (e.target.type === "checkbox" || e.target.nodeName === "path" || e.target.type === "submit" || e.target.type === "text" || e.target.type === "date" || e.target.type === "time") {
      //need this conditional otherwise clicking on the checkbox leads to closing the card
      return null;
    } else {
      setMoreDetails(!moreDetails);
    }
  };



  useEffect(() => {
    // fetchGuests
    // should use guests id to get the name of the users and save to state
  }, []);
  return (
    <CardContainer className="potluck-card" onClick={clickHandle}>
      <h4>{`${potluck_name}`}</h4>
      <h6>{`Organizer: ${organizer}`}</h6>
      <h6>{`Guests: ${guestList.map(guest => guest.username).join(', ')}`}</h6>
      <p>{date}</p>
      {moreDetails && (
        <div>
          {props.potluckStatus === "my-potlucks" ? (
            edit ? (
              <>
              <form>
              <label>
                    PotLuckName:
                    <input
                    type="text"
                    name="potluck_name"
                    value={editValues.potluck_name}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                    type="date"
                    name="date"
                    onChange={onChange}
                    value={editValues.date}
                    />
                </label>
                <label>
                    Time:
                    <input
                    type="time"
                    value={editValues.time}
                    onChange={onChange}
                    name="time"
                    />
                </label>
                <label>
                    Location:
                    <input
                    type="text"
                    value={editValues.location}
                    onChange={onChange}
                    name="location"
                    />
                </label>
                <label>
                    Food Items:
                    <input
                    type="text"
                    value={addFood.food_name}
                    onChange={onChange}
                    name="food_name"
                    />
                    <button onClick={addFoodItem}>Add Food</button>
                </label>
                {foodItems.map(item => {
                    return (
                        <li>
                            <span>{item.food_name}</span>
                            <button onClick={deleteFoodItem}><FaIcons.FaTrash /></button>
                        </li>
                    )
                })}
                <div>
                <button>Submit</button>
                <button onClick={editPotluck}>Cancel</button>
                </div>
              </form>
                
              </>
            ) : (
              <>
                <p>Time: {time}</p>
                <p>Location: {location}</p>
                <form onSubmit={onSubmit}>
                  {foodItems.map((item) => (
                    <span key={item.food_name}>
                      <input
                        type="checkbox"
                        id={item.selectedBy}
                        name={item.food_name}
                        checked={item["selected?"]}
                        onChange={onChange}
                      />
                      <label for={item.food_name}>{item.food_name}</label>
                    </span>
                  ))}
                  <div>
                    <button>Submit</button>
                    <button onClick={editPotluck}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                  </div>
                </form>
                <div>
                
                </div>
                
              </>
            )
          ) : (
            <>
              <p>Time: {time}</p>
              <p>Location: {location}</p>
              <form onSubmit={onSubmit}>
                {foodItems.map((item) => (
                  <span key={item.food_name}>
                    <input
                      type="checkbox"
                      id={item.selectedBy}
                      name={item.food_name}
                      checked={item["selected?"]}
                      onChange={onChange}
                    />
                    <label for={item.food_name}>{item.food_name}</label>
                  </span>
                ))}
                <div>
                  <button>Submit</button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </CardContainer>
  );
};

export default PotluckCard