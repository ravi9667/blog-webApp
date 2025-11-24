import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PublicRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // User is logged in, redirect to dashboard
            navigate("/dashboard", { replace: true }); 
        }
    }, [navigate]);

    return children;
}

export default PublicRoute;