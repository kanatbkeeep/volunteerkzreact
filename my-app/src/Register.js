import './App.css';
import '../src/style/header_style.css'
import RegistrationBox from "./components/registrationBox";
import '../src/style/authorization_style.css'
import '../src/api/UserService'
import React from 'react';

function Register() {

    return (
        <div className="App">
            <RegistrationBox/>
        </div>
    );
}

export default Register;
