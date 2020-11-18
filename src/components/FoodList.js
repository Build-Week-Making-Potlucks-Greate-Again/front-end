import React from "react";
import * as FaIcons from "react-icons/fa";

function FoodList({ food, list }) {
    const deleteFoodItem = (e) => {
        e.preventDefault();
        const btnClick = e.target.parentNode.parentNode.parentNode.innerText
        // console.log(e.target.parentNode.parentNode.parentNode.innerText, "buttonClick");

        // console.log(e.target.parentNode.parentNode.innerText, "deleteFoodItem");

        console.log(food, "deleteFoodItem");
        list(food.filter((foodItem) => foodItem !== btnClick));
    };

    return (
    <ul>
        {food.map((foodItem) => {
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
