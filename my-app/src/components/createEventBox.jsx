import React from 'react';
import '../style/createEvent_style.css';
import {createEventApi} from "../api/EventService";

function CreateEventBox() {
    return (
        <div className="createEventBox">
            <div className="formCreateEvent">
                <form>
                    <label htmlFor="city">City</label>
                    <input className="createEventInput" type="text" id="city" name="city" placeholder="In witch city will be event?"/>

                    <label htmlFor="time">Time</label>
                    <input className="createEventInput" type="text" id="time" name="time" placeholder="Time of event xx:xx - xx:xx"/>

                    <label htmlFor="date">Date</label>
                    <input className="createEventInput" type="text" id="date" name="date" placeholder="Event date dd/mm/yyyy"/>

                    <label htmlFor="amountOfVolunteer">Maximum amount of volunteer</label>
                    <input className="createEventInput" type="text" id="amountOfVolunteer" name="amountOfVolunteer" placeholder="Maximum amount of volunteer"/>

                    <label htmlFor="description">Description</label>
                    <input className="createEventInput" type="text" id="description" name="description" placeholder="Description of event"/>

                    <input className="createEventInput" type="submit" value="Submit" onClick={createEvent}/>
                </form>
            </div>
        </div>
    )
}

function createEvent() {
    let city = document.getElementById('city').value;
    let time = document.getElementById('time').value;
    let date = document.getElementById('date').value;
    let amountOfVolunteer = document.getElementById('amountOfVolunteer').value;
    let description = document.getElementById('description').value;
    let token = getCookie("Authorization");
    createEventApi(city, time, date, amountOfVolunteer, description, token);
}

function getCookie(user) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (user === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export default CreateEventBox;