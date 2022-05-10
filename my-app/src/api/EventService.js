export async function createEventApi(name, city, time, date, amountOfVolunteer, description, file, token, lat, lng) {
    const response = fetch('http://localhost:8080/event/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify({
            name : name,
            city : city,
            time : time,
            date : date,
            amountOfVolunteer : amountOfVolunteer,
            description: description,
            image : file,
            lat: lat,
            lng: lng
        })
    })

    console.log((await response).text());

    return response.data;
}

export async function getEvents() {
    const response = fetch('http://localhost:8080/event/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log((await response).text());

    return response.data;
}

export async function checkUserInEvent(token, id) {
    let response = await fetch('http://localhost:8080/event/check?' + new URLSearchParams({
        id_event: id
    }), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    return response.text();
}

export async function finishEvent(id) {
    let response = await fetch('http://localhost:8080/event/finish?' + new URLSearchParams({
        id: id
    }), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    document.location.reload();
    return response.data;
}

export async function updateEventWithImage(id, name, city, time, date, amountOfVolunteer, description, file, token, lat, lng) {
    let response = await fetch('http://localhost:8080/event/updateEvent?' + new URLSearchParams({
        id: id
    }), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : name,
            city : city,
            time : time,
            date : date,
            amountOfVolunteer : amountOfVolunteer,
            description: description,
            image : file,
            lat: lat,
            lng: lng
        })
    })

    return response.data;
}

export async function updateEventWithOutImage(id, name, city, time, date, amountOfVolunteer, description, token, lat, lng) {
    let response = await fetch('http://localhost:8080/event/updateEvent?' + new URLSearchParams({
        id: id
    }), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : name,
            city : city,
            time : time,
            date : date,
            amountOfVolunteer : amountOfVolunteer,
            description: description,
            lat: lat,
            lng: lng
        })
    })

    return response.data;
}