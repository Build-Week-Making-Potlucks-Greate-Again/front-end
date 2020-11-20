import React from 'react'
import styled from "styled-components";

export const FormContainer = styled.section`
    background-color: #242943;
    padding: 10px;
    width: 100%;
    min-height: 100vh;
    color: #fff;
    text-align: left;

    h2 {
        font-size: 2.4rem;
        text-align: center;
        padding: 10px;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-family: Helvetica;
    }
`;

export const StyledForm = styled.form`
    width: 100%;
    min-height: 100vh;
    background-color: #2a2f4a;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.1);

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .mainInfo {
        /* background-color: green; */
        flex-basis: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;

        label {
        font-size: 1.9rem;
        margin-bottom: 10px;
        font-weight: 200;
        letter-spacing: 1px;
            input {
                padding: 7px;
                width: 100%;
            }
        }
}
    .foodItems {
        background-color: crimson;
        flex-basis: 50%;
        padding: 10px;
        text-align: center;

        label {
            font-size: 1.5rem;
            position: relative;

            input {
                margin-left: 10px;
                padding: 8px;
                min-width: 300px;
                border: 1px solid gold;
                &:focus {
                outline: none;
                }
            }
        }
        button.foodBtn {
            position: absolute;
            background-color: rgba(255, 217, 0, 0.349);
            right: 0;
            top: 4px;
            padding: 10px;
            font-size: 10px;
            text-transform: uppercase;
            border: 1px solid gold;
            outline: none;
            border-left: none;
            &:hover {
                background-color: black;
                color: gold;
            }
        }
        ul {
            margin-top: 10px;
            width: 100%;
            height: 300px;
            background-color: black;
            padding: 10px;
            overflow: auto;

            li {
                background-color: blue;
                padding: 5px;
                margin-bottom: 10px;
                font-size: 1.5rem;
                text-transform: uppercase;
                font-family: sans-serif;
                display: flex;
                justify-content: space-evenly;
                align-self: center;
                span {
                    flex-basis: 50%;
                }
                button{
                    padding: 5px;
                    font-size: 1.2rem;
                    background-color: transparent;
                    border: none;
                    color: white;
                    &:hover{
                        color: red;
                    }
                }
            }
        }
    
        @media(max-width: 986px){
            button.foodBtn{
                top:35px;
                right: -95px;
            }
        }
    }
    .userInvited {
        margin-top: 10px;
        background-color: royalblue;
        flex-basis: 100%;
        padding: 10px;
        
        label{
            ${'' /* background-color: orange; */}
            font-size: 1.2rem;
            
            span{
                margin-right: 10px;
            }
            input{
                padding: 5px;
            }
            button{
                padding: 7px;
                font-size: 12px;
                background-color: rgba(255, 217, 0, 0.349);
                border: none;
            }
        }
        ul{
            background-color: orange;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            li{
                background-color: black;
                width: 500px;
                padding: 10px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                span{
                    font-size: 1.5rem;
                    
                }
                button{
                    padding: 5px;
                    font-size: 1.2rem;
                    background-color: transparent;
                    border: none;
                    color: white;
                    &:hover{
                        color: red;
                    }
                }
            }
        }
    }
`;
