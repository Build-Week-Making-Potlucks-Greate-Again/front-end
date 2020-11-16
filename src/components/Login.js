import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../validation/AxiosAuthorization';
import loginSchema from '../validation/loginSchema';

const initialValues = {
    username: '',
    password: '',
}

const Login = (props) => {
    //Declared States
    const [login, setLogin] = useState(initialValues)
    const [disabled, setDisabled] = useState(valid)
    //Update Changes Hook
    const changeHandler = (e) => {
        e.persist();
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };
    //Update Button Effect
    useEffect(() => {
        loginSchema.isValid(login).then((valid) => {
            setDisabled(!valid);
        })
    }, [login]);
    //Axios Submission
    const onSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().post('https://mplga-tt-webft-49.herokuapp.com/auth/login', login)//UPDATE URL MAYBE
            .then(req => {
                localStorage.setItem('token', req.data.payload);
                push('/') //INSERT PAGE AFTER LOGIN
            })
            .catch(err => console.log(err));
    }
    //Form
    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
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
                <button disabled={disabled}>Login</button>
            </form>
        </div>
    )
}

export default Login;