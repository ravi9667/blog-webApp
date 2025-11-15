import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import BlogBackground from "./Components/BlogBackground/BlogBackground";
import Blogs from "./Components/Blogs/Blogs";
import { apiCall } from "../../utils/api";
import Loader from "../../ReusableComponents/Loader/Loader";
import './style.scss'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isloading, setIsLoading] = useState(true)

    const fetchAllBlogs = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5555/fetchAllBlogs");
            const data = await response.json();

            console.log("FETCH ALL BLOGS:", data);

            if (data.ok) {
                setBlogs(data.data);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getUser = async () => {
        const data = await apiCall("http://127.0.0.1:5555/fetchUser")

        if (data?.ok) {
            setUser(data?.data)
        }
    }

    useEffect(() => {
        getUser();
        fetchAllBlogs();
    }, [])

    return (
        <div className="dashboard-container">
            <Header user={user} />
            <BlogBackground />
            {isloading ? <Loader /> : (
                < div className="blogs">
                    <Blogs />
                </div>
            )}
        </div >
    )
}

export default Dashboard;