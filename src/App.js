import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import RegistrationForm from "./components/RegistrationForm";
import Main from "./components/Main";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/register" element={<RegistrationForm/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;