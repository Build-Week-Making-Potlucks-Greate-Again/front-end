import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Header = (props) => {

    // use current location to re-render header
    const location = useLocation()

    return (
        <header>
            <h1>My Potluck Planner</h1>
            {location.pathname !== '/' 
            ? (
                <nav>
                <Link onClick={() => localStorage.removeItem('token')} to='/' >Logout</Link>
                <Link to='/potlucks'>My Potlucks</Link>
                <Link to='/create-potluck'>Create Potluck</Link>
                </nav>
            ) 
            : null }

        </header>
    )
}

export default Header