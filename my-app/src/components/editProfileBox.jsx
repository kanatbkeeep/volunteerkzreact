import React, {useEffect} from 'react';
import $ from 'jquery';

class EditProfileBox extends React.Component {
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

        $('span').on('keydown paste', function (event) {
            if ($(this).text().length === 15 && event.keyCode != 8) {
                event.preventDefault();
            }
        });

        const {item} = this.state;
        return (
            <div className="editProfileBox">
                <div className="fullNameEdit">
                    <div className="content">
                        <span className="nameTag">имя</span>
                        <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                              id="firstNameEdit">{item.firstName}</span>
                    </div>

                    <div className="content">
                        <span className="nameTag">фамилия</span>
                        <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                              id="secondNameEdit">{item.secondName}</span>
                    </div>
                </div>

                <div className="content">
                    <span className="nameTag">дата рождения</span>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="dateOfBirthdayEdit">{item.dateOfBirthday}</span>
                </div>

                <div className="content">
                    <span className="nameTag">номер телефона</span>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="phoneNumberEdit">{item.phoneNumber}</span>
                </div>

                {item.organizationName &&
                <div className="content">
                    <span className="nameTag">название организации</span>
                    <span role="textbox" suppressContentEditableWarning={true} className="textInput" contentEditable
                          id="organizationNameEdit">{item.organizationName}</span>
                </div>
                }

                <button id="editProfileButton">изменить</button>
            </div>
        );
    }
}

export default EditProfileBox;