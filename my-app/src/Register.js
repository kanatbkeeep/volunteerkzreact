import './App.css';
import '../src/style/header_style.css'
import Registration_box from "./components/registration_box";
import '../src/style/authorization_style.css'
import '../src/api/UserService'


function Register() {

    return (
        <div className="App">
            <Registration_box/>
        </div>
    );
}

export default Register;
