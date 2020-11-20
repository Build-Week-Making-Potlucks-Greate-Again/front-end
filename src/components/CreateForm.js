import React, {useState} from 'react'
import {StyledForm} from '../pages/CreatePotLuckStyle'
import FoodList from "./FoodList";
import UserList from "./UserList"
 
import { searchUsername, searchUserId } from '../utils/search'

function CreateForm(props) {
    const { values, change, submit, formValues, guestId, setGuestId } = props;

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
        // search here
        searchUsername(user)
        .then(res => {
            console.log(res)
            res.id && setGuestId([...guestId, res.id])
        })
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
                        <span>Add User:</span>
                        <input type="text" name="guestList" onChange={userChange} value={user} />
                        <button className="userBtn" onClick={userSubmit} >Add User</button>
                    </label>
                    <UserList guestId={guestId} setGuestId={setGuestId} userList={values} formValues={formValues}/>
                </div>
            </div>
        
            <button onClick={onSubmit}>Submit</button>
        </StyledForm>
    );
}

export default CreateForm

// const initialUser = {
//     id: Math.random() * 100000,
//     name: ''
// }
// const [user, setUser] = useState(initialUser)

// const userChange = (e) => {
//     const {value} = e.target
    
//     setUser({
//         id: Math.random() * 100000,
//         ['name']: value
//     })

// }


// const userSubmit = (e) => {
//     e.preventDefault();
//     let nam = user.name;
//     console.log(typeof nam)
//     // search here
//     searchUsername(nam)
//     .then(res => {
//         console.log(res)
//         res.id && setGuestId([...guestId, res.id])
//     })
//     change("guestList", user)
//     setUser("")
// }