    import React, {useState} from 'react'
    import FoodList from "./FoodList";

    function CreateForm(props) {
    const { values, change, submit } = props;

    const onChange = (e) => {
    const { name, value } = e.target;
    change(name, value);
    };
    // Food Proccessor
    const [foodItem, setfoodItem] = useState("");
    const initalFoodList = [];
    const [foodList, setFoodList] = useState(initalFoodList);

    const foodChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setfoodItem(value);
    };

    const foodSubmit = (e) => {
        e.preventDefault();
        setFoodList([...foodList, foodItem]);
        change("food", foodItem);
        setfoodItem("");
    };

    //  food proccess end

    const onSubmit = (e) => {
        // e.preventDefault();

        foodSubmit()

        console.log('submit in createFrom')
    }

    return (
        <form  >
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

            {/* Food Proccesser */}
            <div>
                <label>
                Food Items:
                <input
                    type="text"
                    name="food"
                    onChange={foodChange}
                    value={foodItem}
                />
                <button onClick={foodSubmit}>Enter food</button>
                </label>
                <FoodList food={foodList} list={setFoodList} />
            </div>

            <button onClick={onSubmit}>Submit</button>
            </form>
        );
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
    // const deleteFood = (e) => {
    //     const getoId = e.target.parentNode.parentNode.innerText;
    //     const removedFood = comida.filter((item) => item !== getoId)
    //     console.log(food({
    //         ...comida,
    //         removedFood
    //     }))
    // }