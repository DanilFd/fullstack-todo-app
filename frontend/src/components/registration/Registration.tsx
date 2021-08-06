import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import "./registration.scss"
import {useInput} from "../../hooks/useInput";
import {AuthContext} from "../../context/AuthContext";


export const Registration = () => {
        const username = useInput('')
        const password = useInput('')
        const {registration, error} = useContext(AuthContext)
        return (
            <div className="form__wrapper-auth">
                <form onSubmit={event => event.preventDefault()} className="form">
                    <div className="error__title">{error ? error : ""}</div>
                    <div className="title">Welcome</div>
                    <div className="subtitle">Let's create your account!</div>
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
                    <button onClick={() => registration(username.value, password.value)} className="submit">Create
                        account
                    </button>
                    <div className="redirect__login">
                        <span>Already have an account?</span>
                        <NavLink to="/login">Sing in</NavLink>
                    </div>
                </form>
            </div>

        );
    }
;

