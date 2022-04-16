import './App.css';
import '../src/style/header_style.css'
import '../src/style/authorization_style.css'
import '../src/api/UserService'
import Login from "./Login";
import Register from "./Register";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Header from "./components/header";


function App() {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/login" caseSensitive={false} element={<Login />} />
                <Route path="/register" caseSensitive={false} element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
