import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'

function CreateForm(props) {

    const {values, change, food, submitForm, comida} = props;

    const onChange = (e) => {
        const {name , value, checked, type} = e.target;
        const newValue = type === 'checkbox' ? checked : value
        change(name, newValue)
    }

    // Food submitter section start

    // const [foodList, setFoodList] = useState([])
    const [foodItem, setFoodItem] = useState('')


    const addFood = (e) =>{
        const foodValue = e.target.value;
        setFoodItem(foodValue)
    }

    const deleteFood = (e) => {
        
        // console.log(e.target.parentNode )
        // console.log(e.target.parentNode.parentNode.tagName === "LI" )
        // if(e.target.parentNode.parentNode.tagName === "LI"){

        // }
    }

    const submitFood = (e) => {
        e.preventDefault();

        food(foodItem)
        setFoodItem('')
        console.log('submmit')
    }



    // food submitter section end

    const submitFormHandle = (e) =>{
        e.preventDefault();
        submitForm()
    }


    return (
        <form onSubmit={submitFormHandle}>

            <label>
                Name:
                <input type="text" onChange={onChange} name="name" value={values.name} />
            </label>

            <label>
                PotLuckName:
                <input type="text" onChange={onChange} name="potLuckName" value={values.potLuckName} />
            </label>

            <label>
                Date:
                <input type="date" name="date" onChange={onChange} value={values.date}/>
            </label>

            <label>
                Time: 
                <input type="time" name="time" onChange={onChange} value={values.time} />
            </label>

            <label>
                Location:
                <input type="text" name="location" onChange={onChange} value={values.location} />
            </label>

            <div>
                <label>
                    Food:
                    <input type="text" onChange={addFood} value={foodItem} /><button type="submit" onClick={submitFood} >Add Food</button>
                </label>
                <ul>
                    {
                        comida.map(food => {
                            return(
                                <li onClick={deleteFood}>{food}<FaIcons.FaTrash className="icon" /></li>
                            )
                        })
                    }
                </ul>
            </div>

            
            <button>Submit</button>

        </form>
    )
}

export default CreateForm




  // const removeFood = (e) => {
    //     console.log(e.target)
    //     // console.log(e.target.tagName)
    //     if(e.target.tagName === 'path'){
    //         // e.target.parentNode.parentNode.innerText === foodItem
    //         // values.food.splice()
    //         console.log( values.food.splice(foodItem, 1), ' parrent')
    //     }
    // }