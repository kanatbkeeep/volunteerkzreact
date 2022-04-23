import React, {useEffect, useState} from 'react';

const axios = require('axios');

export async function registrationVolunteer(firstName, secondName, email, password, phoneNumber, dateOfBirthday) {
    const response = fetch('http://localhost:8080/user/createVolunteer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: firstName,
            secondName: secondName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            dateOfBirthday: dateOfBirthday
        })
    })

    return response.data;
}

export async function registrationOrganizer(firstName, secondName, email, password, phoneNumber, dateOfBirthday, organizationName) {
    const response = fetch('http://localhost:8080/user/createOrganizer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: firstName,
            secondName: secondName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            dateOfBirthday: dateOfBirthday,
            organizationName: organizationName
        })
    })

    return response.data;
}

export async function login(email, password) {
    let response = await fetch('http://localhost:8080/user/loginUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    let responseText = await response.text();

    if (response.ok) {
        document.cookie = "Authorization = " + responseText;
        const boxes = document.querySelectorAll('.singInButton');
        boxes.forEach(box => {
            box.style.display = 'none';
        });

        document.getElementById('profileMiniBox').style.display = 'unset'
        document.getElementById('profileMiniBox').innerHTML = await getUserEmail(responseText);
    } else {
        document.getElementById('error_msg').innerHTML = "Incorrect email or password";
        document.getElementById('error_msg').style.display = 'unset';
    }

    return response.data;
}

export async function getUserEmail(token) {
    let response = await fetch('http://localhost:8080/user/getUserEmail', {
        method: 'GET',
        headers: {
            'Authorization' : token
        },
    })

    console.log(response);

    return response.text();
}