import React from 'react';
import '../api/UserService'
import {login} from "../api/UserService";

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

export default Registration_box;