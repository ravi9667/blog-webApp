import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/index';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard';
import './App.scss';

function App() {
                                         
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App