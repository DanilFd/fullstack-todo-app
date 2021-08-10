import React from 'react';
import "./footer.scss"
import mongodbIcon from "./icons/mongodb.svg"
import expressIcon from "./icons/expressjs.svg"
import reactIcon from "./icons/react-js.svg"
import nodejsLogo from "./icons/node-js.svg"

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__stack">
                <img className="footer__stack_icon-mongo" src={mongodbIcon} alt=""/>
                <img src={expressIcon} alt=""/>
                <img src={reactIcon} alt=""/>
                <img src={nodejsLogo} alt=""/>
            </div>
        </div>
    );
};

