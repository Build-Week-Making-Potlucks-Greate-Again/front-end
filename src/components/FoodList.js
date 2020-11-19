import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";

function FoodList({ food, formValues }) {
    const [useItem, setUseItem] = useState("");

    const deleteFoodItem = (e) => {
    e.preventDefault();
    // console.log(e.target.parentNode.parentNode.parentNode)

    const svgClick = e.target.parentNode.parentNode.parentNode.innerText;
    const btnClick = e.target.parentNode.innerText;

    // console.log(btnClick);
    // console.log(useItem, "this is inside delete");

    if (e.target.localName === "path") {
        setUseItem(svgClick);
    } else if (e.target.localName === "button") {
        setUseItem(btnClick);
    }

    // console.log(food, "deleteFoodItem");

    formValues({
        ...food,
        food: [
        ...food.food.filter(
            (foodItem) => foodItem.toLowerCase() !== useItem.toLowerCase()
        )
        ]
    });
    };

    return (
    <ul>
        {food.food.map((foodItem) => {
        return (
            <li>
            <span>{foodItem}</span>
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
