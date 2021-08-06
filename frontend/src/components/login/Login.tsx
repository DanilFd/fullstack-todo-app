import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import "./login.scss"
import {useInput} from "../../hooks/useInput";
import {AuthContext} from "../../context/AuthContext";

export const Login = () => {
    const username = useInput("")
    const password = useInput("")
    const {login, error} = useContext(AuthContext)
    return (
        <div className="form__wrapper-auth">
            <form onSubmit={event => event.preventDefault()} className="form">
                <div className="error__title">{error}</div>
                <div className="title">Welcome</div>
                <div className="subtitle">Log in to your account</div>
                <div className="input-container ic2">
                    <input {...username} id="username" className="input" type="text" placeholder=" "/>
                    <div className="cut"/>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="input-container ic2">
                    <input {...password} autoComplete="on" id="password" className="input" type="password"
                           placeholder=" "/>
                    <div className="cut "/>
                    <label htmlFor="password" className="placeholder">Password</label>
                </div>
                <button onClick={() => login(username.value, password.value)} className="submit">Log in</button>
                <div className="redirect__registration">
                    <span>You don't have an account?</span>
                    <NavLink to="/registration">Sing up</NavLink>
                </div>
            </form>
        </div>

    );
};

