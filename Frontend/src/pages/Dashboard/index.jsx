import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import BlogBackground from "./Components/BlogBackground/BlogBackground";
import Blogs from "./Components/Blogs/Blogs";
import { apiCall } from "../../utils/api";
import './style.scss'

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const data = await apiCall("http://127.0.0.1:5555/fetchUser")

            if(data?.ok) {
                setUser(data?.data)
            }
        }
        getUser();
    }, [])
    
    return (
        <div className="dashboard-container">
            <Header user={user}/>
            <BlogBackground />
            <div className="blogs">
                <Blogs />
            </div>
        </div>
    )
}

export default Dashboard;