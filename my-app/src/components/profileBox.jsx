import React from 'react';
import {Link} from "react-router-dom";


function deleteCookie() {
    document.cookie = 'Authorization =; Max-Age=0'
    window.location.href = "/login";
}

class ProfileBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: []
        };
    }

    componentDidMount() {
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

        fetch(
            "http://localhost:8080/user/getUser",
            {
                method: 'GET',
                headers: {
                    'Authorization': getCookie("Authorization")
                }
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    item: json
                });
            })
    }

    render() {
        const {item} = this.state;
        let role;
        if (Array.isArray(item.roles)) {
            if (item.roles[0].roleName === "VOLUNTEER") role = "волонтер";
            else if (item.roles[0].roleName === "ORGANIZER") role = "организатор";
        }

        return (
            <div className="profileBox">
                <div className="upside">
                    <div className="fullName">{item.firstName + " " + item.secondName}</div>
                    <div className="roleName">{role}</div>
                </div>

                <div className="downside">
                    <div className="userInfo">
                        <div className="userInfoEntity">email: {item.email}</div>
                        <div className="userInfoEntity">номер телефона: {item.phoneNumber}</div>
                        <div className="userInfoEntity">дата рождения: {item.dateOfBirthday}</div>
                        {item.organizationName &&
                        <div className="userInfoEntity">название организации: {item.organizationName}</div>
                        }
                    </div>

                    <div className="controlButton">
                        <Link to="/editProfile" id="changeProfileInfo" className="profileButton">изменить</Link>
                        <button id="logout" className="profileButton" onClick={deleteCookie}>выйти</button>
                    </div>
                </div>
            </div>
        )
    }
}

export {ProfileBox}