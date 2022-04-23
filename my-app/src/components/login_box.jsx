import React from 'react';
import '../api/UserService'
import {getUserEmail, login} from "../api/UserService";

const Registration_box = () => {

    return (
        <section className="authBlock">

            <input id="email" placeholder="e-mail"/>
            <input id="password" placeholder="пароль"/>
            <span id="result_msg"/>
            <span id="error_msg"/>
            <button id="buttonAuth" onClick={setUser}>Войти</button>
        </section>
    );
};

function setUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    document.getElementById('error_msg').style.display = 'none';
    login(email, password).then(r => console.log("logging"));
}

// async function checkCookie() {
//     let token = getCookie("Authorization");
//     if (token != null) {
//         const boxes = document.querySelectorAll('.singInButton');
//         boxes.forEach(box => {
//             box.style.display = 'none';
//         });
//
//         document.getElementById('profileMiniBox').style.display = 'unset'
//         document.getElementById('profileMiniBox').innerHTML = await getUserEmail(token);
//     }
// }
//
// function getCookie(user) {
//     let cookieArr = document.cookie.split(";");
//     for(let i = 0; i < cookieArr.length; i++) {
//         let cookiePair = cookieArr[i].split("=");
//         if(user === cookiePair[0].trim()) {
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }

export default Registration_box;