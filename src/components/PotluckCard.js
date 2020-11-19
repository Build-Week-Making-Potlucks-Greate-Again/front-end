import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 7px solid ${(pr) => pr.theme.primaryColor};
  min-width: 25rem;
  max-width: 50rem;
  margin: 1rem 2rem;
`;

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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    debugger
    if (type = 'checkbox') {
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
    if (e.target.type === "checkbox" || e.target.type === "submit") {
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
    <StyledDiv className="potluck-card" onClick={clickHandle}>
      <h4>{`${potluck_name}`}</h4>
      <h6>{`Organizer: ${organizer}`}</h6>
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
    </StyledDiv>
  );
};

export default PotluckCard;
