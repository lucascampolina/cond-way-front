import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import RegistrationForm from "./components/RegistrationForm";
import Users from "./components/Users";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<RegistrationForm/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;