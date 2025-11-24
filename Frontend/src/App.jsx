import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/index';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard';
import PublicRoute from './pages/PublicRoute/PublicRoute'
import './App.scss';

function App() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/login'
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App