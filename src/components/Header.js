import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const StyledHeader = styled.header`
margin: 1rem auto 1.8rem auto;

h1 {
    font-size: 3.5rem;
}
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
    color: ${pr => pr.theme.defaultTextColor};

    &:hover {
        color: ${pr => pr.theme.tertiaryColor}
    }
}
`

const Header = (props) => {

    // use current location to re-render header
    const location = useLocation()

    return (
        <StyledHeader>
            <h1>Potluck Planner</h1>
            {location.pathname !== '/' 
            ? (
                <nav className='app-nav'>
                <Link onClick={() => {
                    localStorage.removeItem('username')
                    localStorage.removeItem('token')
                    }} to='/' >Logout</Link>
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