import './App.css';
import '../src/api/UserService'
import './style/editProfile_style.css'
import React from 'react';
import EditProfileBox from "./components/editProfileBox";

function EditProfileInfo() {

    return (
        <div className="editProfileInfo">
            <EditProfileBox/>
        </div>
    );
}

export default EditProfileInfo;
