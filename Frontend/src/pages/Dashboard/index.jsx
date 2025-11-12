import React from "react";
import Header from "./Components/Header/Header";
import BlogBackground from "./Components/BlogBackground/BlogBackground";
import Blogs from "./Components/Blogs/Blogs";
import './style.scss'

const Dashboard = () => {
    
    return (
        <div className="dashboard-container">
            <Header />
            <BlogBackground />
            <div className="blogs">
                <Blogs />
            </div>
        </div>
    )
}

export default Dashboard;