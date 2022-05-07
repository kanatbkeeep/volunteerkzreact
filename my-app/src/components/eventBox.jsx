import React from 'react';
import '../style/eventBox_style.css'
import {joinToEvent} from "../api/UserService";

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

function joinToEventButton() {
    let baseUrl = (window.location).href; // You can also use document.URL
    let eventId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    joinToEvent(getCookie("Authorization"), eventId);
}

class EventBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: [],
            checker: [],
            user: []
        };
    }

    componentDidMount() {
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
                this.setState({
                    item: json
                });
            })

        fetch(
            "http://localhost:8080/event/check?" + new URLSearchParams({
                id_event: eventId
            }),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': getCookie("Authorization")
                }
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    checker: json
                });
            })

        fetch(
            'http://localhost:8080/user/getUser', {
            method: 'GET',
            headers: {
                'Authorization': getCookie("Authorization")
            },
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user: json
                });
            })
    }

    render() {
        const {item, checker, user} = this.state;
        console.log(user);

        return (
            <div className="EventBox">
                <div className="eventBoxInfo">
                    <img className="eventPageImage" alt="eventBoxImage" src={item.image}/>
                    <div className="allEventInfo">
                        <div className="eventPageName">{item.name}</div>
                        <div className="eventPageInfo">город: {item.city}</div>
                        <div
                            className="eventPageInfo">количество: {Array.isArray(item.participants) && item.participants.length} / {item.amountOfVolunteer}</div>
                        <div className="eventPageInfo">время: {item.time}</div>
                        <div className="eventPageInfo">дата: {item.date}</div>
                        {!item.finish && getCookie("Authorization") && !checker && user.roles[0].roleName === "VOLUNTEER" &&
                        <button onClick={joinToEventButton} type="button" className="eventPageButton"
                                id="eventPageButton">Участвовать</button>
                        }
                    </div>
                </div>

                <div className="eventPageDescriptionBox">
                    <div className="eventPageTitle">Описание мероприятия</div>
                    <div className="eventPageDesc">{item.description}</div>
                </div>

                <div className="participants">
                    <div className="eventPageTitle">Участники</div>

                    {Array.isArray(item.participants) && item.participants.map((participant) => (
                        <div className="participantContent">
                            <img className="participantAvatar" src={participant.image} alt="participantAvatar"/>
                            <div className="participantFullName">{participant.firstName} {participant.secondName}</div>
                        </div>
                    ))}
                </div>

                <footer>
                    <h1>Контакты</h1>
                    <span>+7(xxx)xxx-xx-xx</span>
                    <span>infovalunteer@gmail.com</span>
                </footer>
            </div>
        );
    }
}

export default EventBox;