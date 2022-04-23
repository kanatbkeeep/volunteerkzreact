import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <a href="#" className="logo">Volunteer.kz</a>
            <div>
                <Link to="/login" className="singInButton">Войти</Link>
                <Link to="/register" className="singInButton">Регистрация</Link>
                <Link to="/profile" id="profileMiniBox"/>
            </div>
        </header>
    );
};

export default Header;