import React, { useState, useEffect } from 'react';
import '../style/createEvent_style.css';
import {createEventApi} from "../api/EventService";

// openlayers
import GeoJSON from 'ol/format/GeoJSON'
import MapWrapper from '../components/MapWrapper'

function CreateEventBox() {
    const [ features, setFeatures ] = useState([])
    // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
    //  GeoJson API (read from flat .json file in public directory)
    useEffect( () => {

        fetch('/mock-geojson-api.json')
            .then(response => response.json())
            .then( (fetchedFeatures) => {

                // parse fetched geojson into OpenLayers features
                //  use options to convert feature from EPSG:4326 to EPSG:3857
                const wktOptions = {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }
                const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)

                // set features into state (which will be passed into OpenLayers
                //  map component as props)
                setFeatures(parsedFeatures)

            })

    },[])

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

                    <MapWrapper features={features} />
                    <button className="createEventInput updateEventButton" type="button" value="Submit" onClick={createEvent}>Создать</button>
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

    let lat
    let long
    if (document.getElementById('mapCreateEvent').getAttribute('data-value') == null) {
        return;
    }
    else {
        lat = document.getElementById('mapCreateEvent').getAttribute('data-value').split(",")[0];
        long = document.getElementById('mapCreateEvent').getAttribute('data-value').split(",")[1];
    }

    let token = getCookie("Authorization");

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        createEventApi(name, city, time, date, amountOfVolunteer, description, reader.result, token, lat, long);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
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