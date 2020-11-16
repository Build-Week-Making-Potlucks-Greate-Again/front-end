import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'

function CreateForm(props) {

    const {values, change, food,submitForm} = props;

    const onChange = (e) => {
        const {name , value, checked, type} = e.target;
        const newValue = type === 'checkbox' ? checked : value
        change(name, newValue)
    }
    
    // Food submitter section start

    const [foodList, setFoodList] = useState([])
    const [foodItem, setFoodItem] = useState('')


    const addFood = (e) =>{
        const foodValue = e.target.value;
        setFoodItem(foodValue)
    }

    // const removeFood = (e) => {
    //     console.log(e.target)
    //     // console.log(e.target.tagName)
    //     if(e.target.tagName === 'path'){
    //         // e.target.parentNode.parentNode.innerText === foodItem
    //         // values.food.splice()
    //         console.log( values.food.splice(foodItem, 1), ' parrent')
    //     }
    // }


    

    const submitFood = (e) => {
        e.preventDefault();
        setFoodList([
            ...foodList,
            foodItem
        ])
        food(foodItem)
        setFoodItem('')
        console.log('submmit')
    }
    
    // food submitter section end


    return (
        <form onSubmit={submitForm}>
            
            <label>
                Name:
                <input type="text" onChange={onChange} name="name" value={values.name} />
            </label>

            <label>
                PotLuckName:
                <input type="text" onChange={onChange} name="PotLuckName" value={values.PotLuckName} />
            </label>

            <label>
                Date: 
                <input type="date" />
            </label>

            <div>
                <label>
                    Food:
                    <input type="text" onChange={addFood} value={foodItem} /><button type="submit" onClick={submitFood} >Add Food</button>
                </label>
                <ul>
                    {
                        foodList.map(food => {
                            return(
                                <li >{food}<FaIcons.FaTrash className="icon" /></li>
                                
                            )
                        })
                    }
                </ul>
            </div>


        </form>
    )
}

export default CreateForm
