import React from 'react';
import $ from "jquery";
import {login, registrationOrganizer, registrationVolunteer} from "../api/UserService";

let isVolunteer = true;

const Authorization = () => {
    return (
        <div className="login-page">
            <div className="form">
                <form className="register-form">
                    <div className="switcher">
                        <span className="options" id="option_one" onClick={changeToVolunteer}>волонтер</span>
                        <span className="options" id="option_two" onClick={changeToOrganizer}>организатор</span>
                    </div>
                    <input type="text" placeholder="имя" id="firstNameRegister"/>
                    <input type="text" placeholder="фамилия" id="secondNameRegister"/>
                    <input type="text" placeholder="дата рождения" id="dateOfBirthdayRegister" onKeyUp={autoSlash}/>
                    <input type="text" placeholder="номер телефона" id="phoneNumberRegister"/>
                    <input type="email" placeholder="email" id="emailRegister"/>
                    <input type="password" placeholder="пароль" id="passwordRegister"/>
                    <input type="text" placeholder="имя организации" id="organizationNameRegister"/>
                    <button onClick={createUser}>create</button>
                    <p className="message">Already registered? <a href="#" onClick={switcher}>Sign In</a></p>
                </form>
                <form className="login-form">
                    <input type="email" placeholder="email" id="emailLogin"/>
                    <input type="password" placeholder="пароль" id="passwordLogin"/>
                    <span id="error_msgLogin"/>
                    <button onClick={loginUser}>login</button>
                    <p className="message">Not registered? <a href="#" onClick={switcher}>Create an account</a></p>
                </form>
            </div>
        </div>
    );
};

function switcher() {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
}

function changeToVolunteer() {
    isVolunteer = true;
    document.getElementById('option_one').style.backgroundColor = '#98D636';
    document.getElementById('option_one').style.color = 'white';
    document.getElementById('option_two').style.backgroundColor = '#E1E1E1';
    document.getElementById('option_two').style.color = 'black';
    document.getElementById('organizationNameRegister').style.display = 'none';
}

function changeToOrganizer() {
    isVolunteer = false;
    document.getElementById('option_two').style.backgroundColor = '#98D636';
    document.getElementById('option_two').style.color = 'white';
    document.getElementById('option_one').style.backgroundColor = '#E1E1E1';
    document.getElementById('option_one').style.color = 'black';
    document.getElementById('organizationNameRegister').style.display = 'unset';
}

function loginUser() {
    let email = document.getElementById('emailLogin').value;
    let password = document.getElementById('passwordLogin').value;
    document.getElementById('error_msgLogin').style.display = 'none';
    login(email, password).then(r => console.log("logging"));
}

function createUser() {
    let firstName = document.getElementById('firstNameRegister').value;
    let secondName = document.getElementById('secondNameRegister').value;
    let email = document.getElementById('emailRegister').value;
    let password = document.getElementById('passwordRegister').value;
    let phoneNumber = document.getElementById('phoneNumberRegister').value;
    let dateOfBirthday = document.getElementById('dateOfBirthdayRegister').value;
    let organizationName = document.getElementById('organizationNameRegister').value;

    if (isVolunteer) registrationVolunteer(firstName, secondName, email, password, phoneNumber, dateOfBirthday).then(r => console.log(r));
    else registrationOrganizer(firstName, secondName, email, password, phoneNumber, dateOfBirthday, organizationName).then(r => console.log(r));

}

function autoSlash() {
    let numChars = $("#dateOfBirthdayRegister").val().length;
    if(numChars === 2 || numChars === 5){
        let thisVal = $("#dateOfBirthdayRegister").val();
        thisVal += '/';
        $("#dateOfBirthdayRegister").val(thisVal);
    }
}

export default Authorization;