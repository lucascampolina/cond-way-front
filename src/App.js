import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import RegistrationForm from "./components/RegistrationForm";
import Users from "./components/Users";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/*    <ProtectedRoute>*/}
                        {/*        <Dashboard />*/}
                        {/*    </ProtectedRoute>*/}
                        {/*} />*/}
                    </Routes>
                </Router>
            </AuthProvider>
        </Provider>
    );
};

export default App;
