import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {getUserEmail} from "../api/UserService";
import '../style/header_style.css';

function Header() {
    useEffect(() => {
            checkCookie().then(r => console.log("cookie checked"));
    }, [])

    return (
        <header>
            <a href="/login" className="logo">Volunteer.kz</a>
            <div>
                <Link to="/login" className="singInButton">Войти</Link>
                <Link to="/profile" id="profileMiniBox"/>
            </div>
        </header>
    )


}

async function checkCookie() {
    let token = getCookie("Authorization");
    if (token != null) {
        const boxes = document.querySelectorAll('.singInButton');
        boxes.forEach(box => {
            box.style.display = 'none';
        });

        document.getElementById('profileMiniBox').style.display = 'unset';
        document.getElementById('profileMiniBox').innerHTML = await getUserEmail(token);
    }
}

function getCookie(user) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (user === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export default Header;