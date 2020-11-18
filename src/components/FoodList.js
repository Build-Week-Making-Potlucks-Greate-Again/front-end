import React from "react";

function FoodList({ food }) {

    return (
        <ul>
        {food.map((foodItem) => {
            return <li>{foodItem}</li>;
        })}
        </ul>
    );
}

export default FoodList;
