import React, {useEffect, useState} from 'react';

const axios = require('axios');

export async function registrationVolunteer(firstName, secondName, email, password, phoneNumber, dateOfBirthday) {
    const response1 = fetch('http://localhost:8080/user/createVolunteer', {
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

    return response1.data;
}

export async function registrationOrganizer(firstName, secondName, email, password, phoneNumber, dateOfBirthday, organizationName) {
    const response2 = fetch('http://localhost:8080/user/createOrganizer', {
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

    return response2.data;
}

export async function login(email, password) {
    let response3 = await fetch('http://localhost:8080/user/loginUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    document.cookie = "Authorization=Bearer " + await response3.text();

    return response3.data;
}