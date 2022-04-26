import './App.css';
import Login from "./Login";
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
                <Route path="/profile" caseSensitive={false} element={<Profile/>}/>
                <Route path="/editProfile" caseSensitive={false} element={<EditProfileInfo/>}/>
            </Routes>
        </Router>
        )
    }
}

export default App;
