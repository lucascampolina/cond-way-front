import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import RegistrationForm from "./components/RegistrationForm";
import Main from "./components/Main";
import Users from "./components/Users";
import Login from "./components/Login";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/register" element={<RegistrationForm/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;