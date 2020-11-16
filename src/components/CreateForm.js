import React, {useState} from 'react'

function CreateForm(props) {

    const {values, change} = props;

    const onChange = (e) => {
        const [value,name] = e.target
        change(value,name)
    }
    
    // Food submitter section start

    const [foodList, setFoodList] = useState([])
    const [foodItem, setFoodItem] = useState('')


    const addFood = (e) =>{
        const foodValue = e.target.value;
        setFoodItem(foodValue)
    }


    

    const submitFood = (e) => {
        e.preventDefault();
        setFoodList([
            ...foodList,
            foodItem
        ])
        values.food.push(foodItem)
        console.log('submmit')
    }
    
    // food submitter section end


    return (
        <form>
            
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
                    <input type="text" onChange={addFood} /><button type="submit" onClick={submitFood} >Add Food</button>
                </label>
                <ul>
                    {
                        foodList.map(food => {
                            return(
                                <li>{food}</li>
                            )
                        })
                    }
                </ul>
            </div>


        </form>
    )
}

export default CreateForm
