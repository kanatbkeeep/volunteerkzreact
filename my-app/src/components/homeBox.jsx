import React from 'react';
import '../style/home_style.css';
import aboutUsImage from  '../image/aboutUsImage.jpg'
import bannerImage from  '../image/bannerImage.jpg'
import expoImage from  '../image/expo.jpg'

function HomeBox() {
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
                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>

                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>

                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>
                </div>

                <div className="eventRow">
                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>

                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>

                    <div className="eventBox">
                        <div className="eventImage" style={{backgroundImage: `url(${expoImage})`}}/>
                        <div className="eventName">EXPO 2017</div>
                        <div className="eventInfo">город: Нур-Султан</div>
                        <div className="eventInfo">дата: 23 Август, 2017</div>
                        <div className="eventInfo">время: 10:00 - 23:00</div>
                        <div className="eventInfo">количество: 54 / 100</div>
                        <button className="eventButton">Участвовать</button>
                    </div>
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

export default HomeBox;