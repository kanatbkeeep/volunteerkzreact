export async function createEventApi(city, time, date, amountOfVolunteer, description, token) {
    const response = fetch('http://localhost:8080/event/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify({
            city : city,
            time : time,
            date : date,
            amountOfVolunteer : amountOfVolunteer,
            description: description
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