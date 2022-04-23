import React from 'react';
import '../api/UserService'
import {registrationOrganizer, registrationVolunteer} from "../api/UserService";
import * as moment from 'moment';
import $ from "jquery";

let isVolunteer = true;

const Registration_box = () => {

    return (
        <section className="authBlock">
            <div className="switcher">
                <span className="options" id="option_one" onClick={changeToVolunteer}>волонтер</span>
                <span className="options" id="option_two" onClick={changeToOrganizer}>организатор</span>
            </div>


            <input id="name" placeholder="имя"/>
            <input id="surname" placeholder="фамилия"/>
            <input id="dateOfBirthday" name="dateOfBirthday" placeholder="дата рождения dd/mm/yyyy" onKeyUp={autoSlash}/>
            <input id="number" placeholder="номер телефона"/>
            <input id="email" placeholder="e-mail"/>
            <input id="password" placeholder="пароль"/>
            <input id="organizationName" placeholder="Имя организации"/>
            <span id="error_msg"/>

            <button id="buttonAuth" onClick={setUser}>Регистрация</button>
        </section>
    );
};

function changeToVolunteer() {
    isVolunteer = true;
    document.getElementById('option_one').style.backgroundColor = '#98D636';
    document.getElementById('option_one').style.color = 'white';
    document.getElementById('option_two').style.backgroundColor = '#E1E1E1';
    document.getElementById('option_two').style.color = 'black';
    document.getElementById('organizationName').style.display = 'none';
}

function changeToOrganizer() {
    isVolunteer = false;
    document.getElementById('option_two').style.backgroundColor = '#98D636';
    document.getElementById('option_two').style.color = 'white';
    document.getElementById('option_one').style.backgroundColor = '#E1E1E1';
    document.getElementById('option_one').style.color = 'black';
    document.getElementById('organizationName').style.display = 'unset';
}


function setUser() {
    let firstName = document.getElementById('name').value;
    let secondName = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let phoneNumber = document.getElementById('number').value;
    let dateOfBirthday = document.getElementById('dateOfBirthday').value;
    let organizationName = document.getElementById('organizationName').value;


    if (!moment(dateOfBirthday, 'DD/MM/YYYY', true).isValid()) {
        document.getElementById('error_msg').style.display = 'none';
        document.getElementById('error_msg').innerHTML = "This is not a valid date format";
        document.getElementById('error_msg').style.display = 'unset';
    } else if (ValidateEmail(email)) {
        document.getElementById('error_msg').style.display = 'none';
        document.getElementById('error_msg').innerHTML = "This is not a valid email format";
        document.getElementById('error_msg').style.display = 'unset';
    } else {
        document.getElementById('error_msg').style.display = 'none';
        if (isVolunteer) registrationVolunteer(firstName, secondName, email, password, phoneNumber, dateOfBirthday).then(r => console.log(r));
        else registrationOrganizer(firstName, secondName, email, password, phoneNumber, dateOfBirthday, organizationName).then(r => console.log(r));
    }
}

function ValidateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !validRegex.test(input);
}

function autoSlash() {
    let numChars = $("#dateOfBirthday").val().length;
    if(numChars === 2 || numChars === 5){
        let thisVal = $("#dateOfBirthday").val();
        thisVal += '/';
        $("#dateOfBirthday").val(thisVal);
    }
}

export default Registration_box;