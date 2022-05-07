export async function createEventApi(name, city, time, date, amountOfVolunteer, description, file, token) {
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
            image : file
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