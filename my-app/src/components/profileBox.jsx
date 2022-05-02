import React from 'react';
import phoneIcon from '../image/phoneIcon.png';
import avatar from '../image/profileAvatar.png';


function deleteCookie() {
    document.cookie = 'Authorization =; Max-Age=0'
    window.location.href = "/login";
}

function goToEditProfile() {
    window.location.href = "/editProfile";
}

function goToCreateEvent() {
    window.location.href = "/createEvent";
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
                <div className="backGroundProfile"/>
                <div className="infoProfileBoxMain">
                    <img src={avatar} className="avatar" alt="avatar"/>
                    <div className="fullNameProfile">
                        <span className="firstNameProfile">{item.firstName} </span>
                        <span className="firstNameProfile">{item.secondName}</span>
                    </div>
                    <div className="roleProfile">{role}</div>
                    <div className="backGroundInfo">
                        <div className="infoProfileBox">
                            <img src="https://img.icons8.com/fluency/96/000000/circled-envelope.png"
                                 className="profileIcon" id="emailIcon" alt="icon"/>
                            <div className="infoProfileContent">
                                <div className="infoProfileDisc">email</div>
                                <div className="infoProfileResponseResult">{item.email}</div>
                            </div>
                        </div>

                        <div className="infoProfileBox">
                            <img src={phoneIcon} className="profileIcon" alt="icon"/>
                            <div className="infoProfileContent">
                                <div className="infoProfileDisc">номер телефона</div>
                                <div className="infoProfileResponseResult">{item.phoneNumber}</div>
                            </div>
                        </div>

                        <div className="infoProfileBox">
                            <img
                                src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/000000/external-birthday-cake-food-smashingstocks-circular-smashing-stocks.png"
                                className="profileIcon" alt="icon"/>
                            <div className="infoProfileContent">
                                <div className="infoProfileDisc">дата рождения</div>
                                <div className="infoProfileResponseResult">{item.dateOfBirthday}</div>
                            </div>
                        </div>

                        {item.organizationName &&
                        <div className="infoProfileBox">
                            <img
                                src="https://img.icons8.com/cute-clipart/64/000000/business.png"
                                className="profileIcon" alt="icon"/>
                            <div className="infoProfileContent">
                                <div className="infoProfileDisc">имя организации</div>
                                <div className="infoProfileResponseResult">{item.organizationName}</div>
                            </div>
                        </div>
                        }

                        {item.organizationName &&
                        <button className="profileButton createEvent" onClick={goToCreateEvent}>Создать ивент</button>
                        }
                    </div>

                    <div className="profileButtonBox">
                        <button className="profileButton editProfile" onClick={goToEditProfile}>изменить</button>
                        <button className="profileButton logout" onClick={deleteCookie}>выйти</button>
                    </div>
                </div>
            </div>
        )
    }
}

export {ProfileBox}