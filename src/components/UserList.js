import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";

import { searchUsername, searchUserId } from '../utils/search'

function UserList({userList, formValues, guestId, setGuestId}) {
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

        console.log(svgClick)
        
        searchUsername(svgClick)
        .then(res => {
            console.log(res)
            setGuestId(...[guestId.filter(id => id !== res.id)])
        })
        .catch(err => {
            console.log(`User Not Found, cannot remove from ID list`)
        })

        formValues({
            ...userList,
            guestList:[
                ...userList.guestList.filter((guest) => guest !== useItem)
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
