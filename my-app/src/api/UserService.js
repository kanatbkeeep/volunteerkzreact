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

    return (await response).text();
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

    return (await response).text();
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
        document.getElementById('error_msgLogin').innerHTML = "Incorrect email or password";
        document.getElementById('error_msgLogin').style.display = 'unset';
    }

    window.location.replace("http://localhost:3000/");

    return response.data;
}

export async function getUser(token) {
    let response = await fetch('http://localhost:8080/user/getUser', {
        method: 'GET',
        headers: {
            'Authorization': token
        },
    })

    return response.text();
}

export async function getUserEmail(token) {
    let response = await fetch('http://localhost:8080/user/getUserEmail', {
        method: 'GET',
        headers: {
            'Authorization': token
        },
    })

    return response.text();
}

export async function editUser(firstName, secondName, phoneNumber, dateOfBirthday, organizationName, token) {
    if (organizationName == null) {
        let response = await fetch('http://localhost:8080/user/updateDataUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                firstName: firstName,
                secondName: secondName,
                phoneNumber: phoneNumber,
                dateOfBirthday: dateOfBirthday
            })
        })

        return response.text();
    } else {
        let response = await fetch('http://localhost:8080/user/updateDataUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                firstName: firstName,
                secondName: secondName,
                phoneNumber: phoneNumber,
                dateOfBirthday: dateOfBirthday,
                organizationName: organizationName
            })
        })

        return response.text();
    }
}

export async function changePhoto(token, file) {
    let response = await fetch('http://localhost:8080/user/changePhoto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            file: file
        })
    })

    document.location.reload();
    return response.data;
}

export async function joinToEvent(token, id) {
    let response = await fetch('http://localhost:8080/user/joinToEvent?' + new URLSearchParams({
        id_event: id
    }), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    document.location.reload();
    return response.data;
}

export async function leaveFromEvent(token, id) {
    let response = await fetch('http://localhost:8080/user/leaveFromEvent?' + new URLSearchParams({
        id_event: id
    }), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    document.location.reload();
    return response.data;
}