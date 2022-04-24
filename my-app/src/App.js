import './App.css';
import '../src/style/header_style.css'
import '../src/style/authorization_style.css'
import '../src/api/UserService'
import Login from "./Login";
import Register from "./Register";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import React from 'react';
import Profile from "./Profile";
import EditProfileInfo from "./EditProfileInfo";

class App extends React.Component {

    render() {
        return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/login" caseSensitive={false} element={<Login/>}/>
                <Route path="/register" caseSensitive={false} element={<Register/>}/>
                <Route path="/profile" caseSensitive={false} element={<Profile/>}/>
                <Route path="/editProfile" caseSensitive={false} element={<EditProfileInfo/>}/>
            </Routes>
        </Router>
        )
    }
}

export default App;
