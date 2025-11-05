import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import './App.scss';

function App() {
                                         
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} /> */}
            </Routes>
        </div>
    )
}

export default App