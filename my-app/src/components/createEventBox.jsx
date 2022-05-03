import React from 'react';
import '../style/createEvent_style.css';
import {createEventApi} from "../api/EventService";

function CreateEventBox() {
    return (
        <div className="createEventBox">
            <div className="formCreateEvent">
                <form name="eventForm" encType="multipart/form-data">
                    <label htmlFor="name">Название</label>
                    <input className="createEventInput" type="text" id="name" name="name" placeholder="Имя ивента"/>

                    <label htmlFor="city">Город</label>
                    <input className="createEventInput" type="text" id="city" name="city" placeholder="В каком городе будет проходить ивент"/>

                    <label htmlFor="time">Время</label>
                    <input className="createEventInput" type="text" id="time" name="time" placeholder="Time of event xx:xx - xx:xx"/>

                    <label htmlFor="date">Дата</label>
                    <input className="createEventInput" type="text" id="date" name="date" placeholder="Event date dd/mm/yyyy"/>

                    <label htmlFor="amountOfVolunteer">Максимальное каличество волонтеров</label>
                    <input className="createEventInput" type="text" id="amountOfVolunteer" name="amountOfVolunteer" placeholder="Maximum amount of volunteer"/>

                    <label htmlFor="description">Описание</label>
                    <input className="createEventInput" type="text" id="description" name="description" placeholder="Description of event"/>

                    <label htmlFor="eventPhoto">Фотография ивента</label>
                    <input accept="image/png, image/gif, image/jpeg" formEncType="multipart/form-data" className="createEventInput photoEventInput" type="file" id="eventPhoto" name="eventPhoto" placeholder="Фотографие ивента"/>

                    <input className="createEventInput" type="submit" value="Submit" onClick={createEvent}/>
                </form>
            </div>
        </div>
    )
}

function createEvent() {
    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let time = document.getElementById('time').value;
    let date = document.getElementById('date').value;
    let amountOfVolunteer = document.getElementById('amountOfVolunteer').value;
    let description = document.getElementById('description').value;
    let file = document.forms['eventForm']['eventPhoto'].files[0];
    let token = getCookie("Authorization");

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        createEventApi(name, city, time, date, amountOfVolunteer, description, reader.result, token);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };


    createEventApi(name, city, time, date, amountOfVolunteer, description, token);
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