import React, { useState, useEffect } from 'react';
import axios from 'axios'
import axiosWithAuth from '../validation/AxiosAuthorization';
import registerSchema from '../validation/registerSchema'
import * as yup from 'yup'

const initialValues = {
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
}
const initialErrors = {
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
}

const Register = (props) => {
    const { push } = props.history
    //Declared States
    const [login, setLogin] = useState(initialValues)
    const [disabled, setDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState(initialErrors);
    //Check for Input
    const changeHandler = (e) => {
        e.persist();
        //Validation
        yup.reach(registerSchema, e.target.name)
        .validate(e.target.value)
        .then(()=>{
           setFormErrors({
            ...formErrors,
            [e.target.name]:'',
           })
        })
        .catch(err=> {
            setFormErrors({
                ...formErrors,
                [e.target.name]:err.errors[0],
            })
        })
        //Update State
        setLogin({
            ...login,
            [e.target.name]:e.target.value,
        });
    };
    //Schema Check for Button
    useEffect(()=>{
        registerSchema.isValid(login).then(valid =>{
            setDisabled(!valid)
        });
    });
    //On Submit 
    const onSubmit = (e) =>{
        e.preventDefault();
        axios.post('https://mplga-tt-webft-49.herokuapp.com/auth/register', login) //CHECK URL
            .then((res)=>{
                window.localStorage.setItem('token', res.data.token);
                push('/') //INSERT PAGE AFTER LOGIN
                console.log(`Success, Please Log-in with registered account`)
            })
            .catch(err => console.log(err));
        
    }

    return (
        <div className='register container'>
            <h3>Register</h3>
            <form onSubmit={onSubmit}>
                <label>
                    First Name:
                    <input 
                        type='text'
                        name='first_name'
                        placeholder='First Name'
                        value={login.first_name}
                        onChange={changeHandler} />
                </label>
                <label>
                    Last Name:
                    <input 
                        type='text'
                        name='last_name'
                        placeholder='Last Name'
                        value={login.last_name}
                        onChange={changeHandler} />
                </label>
                <label>
                    Email:
                    <input 
                        type='text'
                        name='email'
                        placeholder='email'
                        value={login.email}
                        onChange={changeHandler} />
                </label>
                <label>
                    Username:
                    <input
                        type='text'
                        name='username'
                        placeholder='username'
                        value={login.username}
                        onChange={changeHandler} />
                </label>
                <label>
                    Password:
                    <input
                        type='text'
                        name='password'
                        placeholder='password'
                        value={login.password}
                        onChange={changeHandler} />
                </label>
                <button disabled={disabled}>Register</button>
            </form>
            <div className='errors'>
                <p>{formErrors.first_name}</p>
                <p>{formErrors.last_name}</p>
                <p>{formErrors.email}</p>
                <p>{formErrors.username}</p>
                <p>{formErrors.password}</p>
            </div>
        </div>
    )
}

export default Register