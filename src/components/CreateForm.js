import React, {useState} from 'react'
import {StyledForm} from '../pages/CreatePotLuckStyle'
import FoodList from "./FoodList";
import UserList from "./UserList"

function CreateForm(props) {
    const { values, change, submit, formValues } = props;

    const onChange = (e) => {
        const { name, value } = e.target;
        change(name, value);
    };
    
    // Food Proccessor
    const [foodItem, setfoodItem] = useState("");
    
    const foodChange = (e) => {
        const { value } = e.target;
        // console.log(name, value);
        setfoodItem(value);
    };
    
    const foodSubmit = (e) => {
        e.preventDefault();
    
        change("food", foodItem);
        setfoodItem("");
    };
    
    //  food proccess end
    // User start

    const [user, setUser] = useState("")

    const userChange = (e) => {
        const {value} = e.target
        setUser(value)
    }

    const userSubmit = (e) => {
        e.preventDefault();
        change("guestList", user)
        setUser("")
    }

    
    const onSubmit = (e) => {
        e.preventDefault();
        submit();
        console.log("submit in createFrom");
    };
    
    return (
        <StyledForm>
            <div className="container">
                <div className="mainInfo">
                <label>
                    Name:
                    <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    />
                </label>
                <label>
                    PotLuckName:
                    <input
                    type="text"
                    name="PotLuckName"
                    value={values.PotLuckName}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                    type="date"
                    name="date"
                    onChange={onChange}
                    value={values.date}
                    />
                </label>
                <label>
                    Time:
                    <input
                    type="time"
                    value={values.time}
                    onChange={onChange}
                    name="time"
                    />
                </label>
                <label>
                    Location:
                    <input
                    type="text"
                    value={values.location}
                    onChange={onChange}
                    name="location"
                    />
                </label>
                </div>
        
                <div className="foodItems">
                    <label>
                        Food Items:
                        <input
                        type="text"
                        name="food"
                        onChange={foodChange}
                        value={foodItem}
                        />
                        <button className="foodBtn" onClick={foodSubmit}>
                        Enter food
                        </button>
                    </label>
                    <FoodList food={values} formValues={formValues} />
                </div>
        
                <div className="userInvited">
                    <label>
                        Add User:
                        <input type="text" name="guesList" onChange={userChange} value={user} />
                        <button className="userBtn" onClick={userSubmit} >Add User</button>
                    </label>
                    <UserList userList={values} formValues={formValues}/>
                </div>
            </div>
        
            <button onClick={onSubmit}>Submit</button>
        </StyledForm>
    );
}

export default CreateForm

