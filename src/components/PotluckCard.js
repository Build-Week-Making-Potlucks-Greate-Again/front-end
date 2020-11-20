import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import {searchUsername} from '../utils/search'

const CardContainer = styled.div`

    background: ${pr => pr.theme.cardColor1};
    background: ${pr => pr.theme.cardGradientColor1};
    width: 100%;
    padding: ${pr => pr.theme.cardPadding};
    margin-bottom: ${pr => pr.theme.cardSpacing};
    box-shadow: ${pr => pr.theme.cardDropShadow};
    cursor: pointer;
    
    &:hover {
        background: ${pr => pr.theme.tertiaryColor};
    }

  .card-header {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0% 10%;

    /* border: thin black solid; */

    .header-top-row {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
        justify-content: space-between;

        /* border: thin black solid; */
        h4 {
            font-size: 1.8rem;
        }
        p {
            font-size: 0.9rem;
        }
    }

    .attendees {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-content: center;
        justify-content: space-between;
        font-size: 1.3rem;

        .guest-list-container {
            max-width: 50%;
        }
    }
}

    .card-content {
        /* background: ${(pr) => pr.theme.primaryColor}; */
        margin: 1rem 1rem;
        text-align: left;
    }

    .details {
        /* border: thin black solid; */

        display: flex;
        justify-content: space-around;
        padding: 1rem 3rem;


        .info-container {
            width: 70%;
            text-align: left;

            /* border: thin black solid; */
        }

        form {
            display: flex;
            flex-flow: column wrap;
            width: 50%;
            /* padding: 1rem 3rem; */
            text-align: left;

            /* border: thin black solid; */
        }
    }
`;

window.addEventListener("mouseenter", e => {
    console.log(e.target);
});

const getDate = (date) => {
  // var data is passed as a str mm-dd-yyyy
  let dateArr = date.split("-");
  let day = dateArr[2].split("");
  let ending;

  if (day.length > 1) day = parseInt(day[day.length - 1]);
  else day = parseInt(dateArr[2]);

  if (day < 4 && day !== 0) {
    ending = day === 1 ? "st" : day === 2 ? "nd" : "rd";
  } else {
    ending = "th";
  }

  if (dateArr[1] === "1") {
    dateArr[1] = "January";
  } else if (dateArr[1] === "2") {
    dateArr[1] = "February";
  } else if (dateArr[1] === "3") {
    dateArr[1] = "March";
  } else if (dateArr[1] === "4") {
    dateArr[1] = "April";
  } else if (dateArr[1] === "5") {
    dateArr[1] = "May";
  } else if (dateArr[1] === "6") {
    dateArr[1] = "June";
  } else if (dateArr[1] === "7") {
    dateArr[1] = "July";
  } else if (dateArr[1] === "8") {
    dateArr[1] = "August";
  } else if (dateArr[1] === "9") {
    dateArr[1] = "September";
  } else if (dateArr[1] === "10") {
    dateArr[1] = "October";
  } else if (dateArr[1] === "11") {
    dateArr[1] = "November";
  } else if (dateArr[1] === "12") {
    dateArr[1] = "December";
  } else {
    dateArr[1] = null;
  }
  return `${dateArr[1]} ${dateArr[2]}${ending} of ${dateArr[0]}`;
};

const initialFoodObject = {
  food_name: "",
  "selected?": 0,
  selected_by: null,
};
const initialGuestObject = {
    username:''
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
  const { submitEdit, deletePotluck, setMyPotlucks, myPotlucks } = props;
  const [moreDetails, setMoreDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [editValues, setEditValues] = useState(props.potluckInfo);
  const [foodItems, setFoodItems] = useState(foodList);
  const [addFood, setAddFood] = useState(initialFoodObject);
  const [guestName, setGuestName] = useState(initialGuestObject)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
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
    } else if (name === "food_name") {
      setAddFood({ ...addFood, [name]: value });
    } else if (name === 'username') {
        setGuestName({...guestName, [name]:value })
    } else {
      setEditValues({ ...editValues, [name]: value });
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
    console.log(editValues)
    myPotlucks.forEach((potluck) => console.log(potluck.id));
    setMyPotlucks(
      myPotlucks.map((potluck) => (potluck.id === id ? editValues : potluck))
    );
  };

  const addFoodItem = (e) => {
    e.preventDefault();

    console.log(addFood.food_name);
    setFoodItems([...foodItems, addFood]);
    setAddFood(initialFoodObject);
  };

  const deleteFoodItem = (e) => {
    e.preventDefault(e);

    const item_name = e.target.parentNode.parentNode.parentNode.innerText;
    console.log(item_name);
    setFoodItems(
      foodItems.filter((foodItem) => foodItem.food_name !== item_name)
    );
  };

  const addGuest = (e) => {
      e.preventDefault(e)
      
      searchUsername(guestName)
      .then(res => {
          console.log(res)
      })
      .catch(err => {
          console.log(err)
      })

      setEditValues({...editValues, guestList:[...editValues.guestList, guestName]})

      setMyPotlucks(myPotlucks.map(potluck => {
        if (potluck.id === id) {
            return {...potluck, guestList:[...potluck.guestList, guestName]}
        }
        else {
            return potluck
        }
    }))


  }
  const deleteGuest = (e) => {
    e.preventDefault(e);

    const guest_name = e.target.parentNode.parentNode.parentNode.innerText;
    console.log(guest_name);

    setEditValues({...editValues, guestList:(editValues.guestList.filter(guest => guest.username !== guest_name))})


    setMyPotlucks(myPotlucks.map(potluck => {
        if (potluck.id === id) {
            return (
                {...potluck, guestList:(potluck.guestList.filter(guest => guest.username !== guest_name))}
            )
        }
        else {
            return potluck
        }
    }))
  };

  const clickHandle = (e) => {
    // console.log(foodList)
    if (
      e.target.type === "checkbox" ||
      e.target.nodeName === "path" ||
      e.target.type === "submit" ||
      e.target.type === "text" ||
      e.target.type === "date" ||
      e.target.type === "time"
    ) {
      //need this conditional otherwise clicking on the checkbox leads to closing the card
      return null;
    } else {
      setMoreDetails(!moreDetails);
    }
  };

  return (
    <CardContainer className="potluck-card" onClick={clickHandle}>
      <div className='card-header'>
        <div className='header-top-row'>
          <h4>{`${potluck_name}`}</h4>
          <p>{getDate(date)}</p>
        </div>
        <div className='attendees'>
          <h6>{`Organizer: ${organizer}`}</h6>
          <div className='guest-list-container' onMouseEnter={() => setShowGuests(true)} onMouseLeave={() => setShowGuests(false)}>
            <h6>{`Guests: ${showGuests ? guestList
                    .map((guest) => guest.username)
                    .join(', ') : ''}`}</h6>
          </div>
        </div>
      </div>
      {moreDetails && (
        <div className='details'>
          {props.potluckStatus === "my-potlucks" ? (
            edit ? (
              <>
                <form onSubmit={saveEdit}>
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
                  <label>
                    Guests:
                    <input
                      type="text"
                      value={guestName.username}
                      onChange={onChange}
                      name="username"
                    />
                    <button onClick={addGuest}>Add Guest</button>
                  </label>
                  {/* render food itmes for editing  */}
                  {foodItems.map((item) => {
                    return (
                      <li key={item.food_name}>
                        <span>{item.food_name}</span>
                        <button onClick={deleteFoodItem}>
                          <FaIcons.FaTrash />
                        </button>
                      </li>
                    );
                  })}
                  {/* render guest list for editing */}
                  <div>
                  {guestList.map((guest) => {
                    return (
                      <li key={guest.username}>
                        <span>{guest.username}</span>
                        <button onClick={deleteGuest}>
                          <FaIcons.FaTrash />
                        </button>
                      </li>
                    );
                  })}
                  </div>

                  <div>
                    <button>Submit</button>
                    <button onClick={editPotluck}>Cancel</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className='info-container'>
                  <p>Time: {time}</p>
                  <p>Location: {location}</p>
                </div>
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
                      <label for={item.food_name}> {item.food_name.replace(/^\w/, (c) => c.toUpperCase())}</label>
                    </span>
                  ))}
                  <div>
                    <button>Submit</button>
                    <button onClick={editPotluck}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                  </div>
                </form>
                <div></div>
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

export default PotluckCard;
