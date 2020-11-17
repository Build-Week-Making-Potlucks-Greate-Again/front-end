import React from 'react'
import styled from 'styled-components'


export const FormContainer = styled.div`
    background-color: black;
    color: #fff;
    width: 100%;

    form{
        max-width: 800px;
        margin: 0 auto;

        label{
            display: block;
            padding: 10px;
        }

        ul{
            width: 200px;
            
            li{
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 6px 10px;
                background: grey;
                color: green;
            }
        }
    }
`
