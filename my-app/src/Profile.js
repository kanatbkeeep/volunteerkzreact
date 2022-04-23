import './App.css';
import '../src/style/header_style.css'
import Login_box from "./components/login_box";
import '../src/style/authorization_style.css'
import '../src/api/UserService'
import React from 'react';

function Profile() {

    return (
        <div className="App">
            <Login_box/>
        </div>
    );
}

export default Profile;