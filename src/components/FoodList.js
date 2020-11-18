import React from "react";
import * as FaIcons from "react-icons/fa";

function FoodList({ food, formValues }) {

    const deleteFoodItem = (e) => {
        e.preventDefault();

        const btnClick = e.target.parentNode.parentNode.parentNode.innerText

        // console.log(food, "deleteFoodItem");

        formValues({
            ...food,
            food: [...food.food.filter((foodItem) => foodItem !== btnClick)]
        })

        

    };

    return (
    <ul>
        {food.food.map((foodItem) => {
        return (
            <li>
            {foodItem}
            <button onClick={deleteFoodItem}>
                <FaIcons.FaTrash />
            </button>
            </li>
        );
        })}
    </ul>
    );
}

export default FoodList;
