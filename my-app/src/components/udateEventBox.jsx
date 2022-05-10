import React, {useState, useEffect} from 'react';
import '../style/createEvent_style.css';
import {updateEventWithImage, updateEventWithOutImage} from "../api/EventService";

// openlayers
import GeoJSON from 'ol/format/GeoJSON'
import MapWrapperUpdateFuncEvent from "./MapWrapperUpdateEvent";

function UpdateEventBox() {
    const [features, setFeatures] = useState([])
    const [item, setItem] = useState([])
    // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
    //  GeoJson API (read from flat .json file in public directory)
    useEffect(() => {

        fetch('/mock-geojson-api.json')
            .then(response => response.json())
            .then((fetchedFeatures) => {

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

    }, [])

    useEffect(() => {
        let baseUrl = (window.location).href; // You can also use document.URL
        let eventId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
        fetch(
            "http://localhost:8080/event/getById?" + new URLSearchParams({
                id: eventId
            }),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((json) => {
                setItem(json);
            })

    }, [])

    return (
        <div className="createEventBox">
            <div className="formCreateEvent">
                <form name="eventForm" encType="multipart/form-data">
                    <label htmlFor="name">Название</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="name">{item.name}</span>

                    <label htmlFor="city">Город</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="city">{item.city}</span>

                    <label htmlFor="time">Время</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="time">{item.time}</span>

                    <label htmlFor="date">Дата</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="date">{item.date}</span>

                    <label htmlFor="amountOfVolunteer">Максимальное каличество волонтеров</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="amountOfVolunteer">{item.amountOfVolunteer}</span>

                    <label htmlFor="description">Описание</label>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="description">{item.description}</span>

                    <label htmlFor="eventPhoto">Фотография ивента</label>
                    <input accept="image/png, image/gif, image/jpeg" formEncType="multipart/form-data"
                           className="createEventInput photoEventInput" type="file" id="eventPhoto" name="eventPhoto"
                           placeholder="Фотографие ивента"/>

                    <MapWrapperUpdateFuncEvent features={features}/>
                    <button className="updateEventButton" type="button" value="Submit" onClick={updateEvent}>Изменить</button>
                </form>
            </div>
        </div>
    )
}

function updateEvent() {
    let name = document.getElementById('name').innerText;
    let city = document.getElementById('city').innerText;
    let time = document.getElementById('time').innerText;
    let date = document.getElementById('date').innerText;
    let amountOfVolunteer = document.getElementById('amountOfVolunteer').innerText;
    let description = document.getElementById('description').innerText;
    let file = document.forms['eventForm']['eventPhoto'].files[0];
    let lat = document.getElementById('mapCreateEvent').getAttribute('data-value').split(",")[0];
    let long = document.getElementById('mapCreateEvent').getAttribute('data-value').split(",")[1];
    let token = getCookie("Authorization");
    console.log(name);
    console.log(file);

    let baseUrl = (window.location).href; // You can also use document.URL
    let eventId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

    if (file != null) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            updateEventWithImage(eventId, name, city, time, date, amountOfVolunteer, description, reader.result, token, lat, long);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    } else {
        updateEventWithOutImage(eventId, name, city, time, date, amountOfVolunteer, description, token, lat, long);
    }
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

export default UpdateEventBox;