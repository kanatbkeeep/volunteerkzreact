import './App.css';
import '../src/style/header_style.css'
import '../src/style/profile_style.css'
import '../src/api/UserService'
import {ProfileBox} from "./components/profileBox";
import React from 'react';

function Profile() {

    return (
        <div className="Profile">
            <ProfileBox/>
        </div>
    );
}

export default Profile;