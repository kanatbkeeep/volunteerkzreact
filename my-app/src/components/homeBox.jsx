import React from 'react';
import '../style/home_style.css';
import aboutUsImage from '../image/aboutUsImage.jpg'
import bannerImage from '../image/bannerImage.jpg'
import {Link} from "react-router-dom";

class HomeBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        fetch(
            "http://localhost:8080/event/get",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json
                });
            })
    }

    render() {
        const { items } = this.state;
        let events;
        if (items.length !== 0) {
            events = items.map((item) => {
                    return (
                        <Link to={"/event?id=" + item.id} className="eventBox">
                            <div className="eventImage" style={{backgroundImage: `url(${item.image})`}}/>
                            <div className="eventName">{item.name}</div>
                            <div className="eventInfo">город: {item.city}</div>
                            <div className="eventInfo">дата: {item.date}</div>
                            <div className="eventInfo">время: {item.time}</div>
                            <div className="eventInfo">количество: {item.amountOfVolunteer}</div>
                            <button className="eventButton">Участвовать</button>
                        </Link>
                    )
                }
            )
        } else {
            events = <div style={{margin: "50px 0"}}>Пока что нет иветов</div>
        }
        return (
            <div className="home_page">
                <div className="banner" style={{backgroundImage: `url(${bannerImage})`}}>
                    <div className="slogan">Начни с себя - будь волонтером сегодня!</div>
                    <button className="bannerButton">Начать</button>
                </div>

                <div className="aboutUsBox">
                    <h1 className="boxTitle">О нас</h1>
                    <div className="aboutUsContent">
                        <img src={aboutUsImage} className="aboutUsImg" alt="aboutUsImage"/>
                        <span className="aboutUsText">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            </span>
                    </div>
                </div>

                <div className="eventContent">
                    <h1 className="boxTitle">Волонтерствуй с нами</h1>
                    <div className="eventRow">
                        {events}
                    </div>
                </div>

                <footer>
                    <h1>Контакты</h1>
                    <span>+7(xxx)xxx-xx-xx</span>
                    <span>infovalunteer@gmail.com</span>
                </footer>
            </div>
        )
    }
}

export default HomeBox;