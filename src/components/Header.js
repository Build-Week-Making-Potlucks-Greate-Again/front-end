import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const StyledHeader = styled.header`
margin: 1rem auto 3rem auto;

span {
    border: 1px solid grey;
    height: 2rem;
}

.app-nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    width: 25rem;
    /* border: 1px solid red; */
    margin: 1rem auto;
}
.app-nav a{
    display: flex;
    align-items: center;
    /* border: 1px solid green; */
    text-decoration: none;
    color: black;
}
`

const Header = (props) => {

    // use current location to re-render header
    const location = useLocation()

    return (
        <StyledHeader>
            <h1>My Potluck Planner</h1>
            {location.pathname !== '/' 
            ? (
                <nav className='app-nav'>
                <Link onClick={() => localStorage.removeItem('token')} to='/' >Logout</Link>
                <span />
                <Link to='/potlucks'>My Potlucks</Link>
                <span />
                <Link to='/create-potluck'>Create Potluck</Link>
                </nav>
            ) 
            : null }

        </StyledHeader>
    )
}

export default Header