import './App.css';
import '../src/style/header_style.css'
import LoginBox from "./components/loginBox";
import '../src/style/authorization_style.css'
import '../src/api/UserService'
import React from 'react';

function Login() {

    return (
        <div className="App">
            <LoginBox/>
        </div>
    );
}

export default Login;
