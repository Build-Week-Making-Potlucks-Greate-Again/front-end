import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";

function UserList({userList, formValues}) {
    const [useItem, setUseItem] = useState("");

    const deleteUser = (e) => {
        e.preventDefault()

        const svgClick = e.target.parentNode.parentNode.parentNode.innerText;
        const btnClick = e.target.parentNode.innerText;

        if (e.target.localName === "path") {
            setUseItem(svgClick);
        } else if (e.target.localName === "button") {
            setUseItem(btnClick);
        }

        formValues({
            ...userList,
            guestList:[
                ...userList.guestList.filter((guest) => guest.toLowerCase() !== useItem.toLowerCase())
            ]
        })
    }


    return (
        <ul>
            {userList.guestList.map((person) => {
                return (
                    <li>
                        <span>{person}</span>
                        <button onClick={deleteUser}>
                            <FaIcons.FaTrash />
                        </button>
                    </li>
                );
        })}
    </ul>
    )
}

export default UserList
