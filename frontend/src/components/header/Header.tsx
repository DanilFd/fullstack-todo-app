import React, {useContext} from 'react';
import './header.scss'
import {AuthContext} from "../../context/AuthContext";
import logoutIcon from "./icons/logout.svg"

export const Header = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <header className="header__content">
            <div className="header__content_left">
                <img src="https://cdn-images-1.medium.com/max/1200/1*K-4RqDC6zFrpAG31ayDDOg.png" alt=""/>
                <h1>TODO-APP</h1>
            </div>
            <div className="header__content_right">
                <span>{user?.username}</span>
                <button onClick={() => logout()}><img src={logoutIcon} alt=""/></button>
            </div>
        </header>
    );
};

