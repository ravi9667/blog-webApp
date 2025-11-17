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
        setIsLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:5555/fetchAllBlogs");
            const data = await res.json();

            if (data.ok) setBlogs(data.data);
            else alert(data.message);
        } catch (err) {
            console.log("All blogs error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- FETCH MY BLOGS ----------
    const fetchMyBlogs = async () => {
        if (!user) return alert("Please Login!");

        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://127.0.0.1:5555/fetchMyBlogs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (data.ok) setBlogs(data.data);
            else alert(data.message);

        } catch (err) {
            console.log("My blogs error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- FETCH USER ----------
    const getUser = async () => {
        const data = await apiCall("http://127.0.0.1:5555/fetchUser");
        if (data?.ok) setUser(data?.data);
    };

    // ---------- ON MOUNT: USER + ALL BLOGS ----------
    useEffect(() => {
        getUser();
        fetchAllBlogs();  // show all blogs on mount
    }, []);

    return (
        <div className="dashboard-container">
            <Header
                user={user}
                fetchAllBlogs={fetchAllBlogs}
                fetchMyBlogs={fetchMyBlogs}
                setBlogs={setBlogs}
            />
            <BlogBackground />

            {isloading ? (
                <Loader />
            ) : (
                <div className="blogs">
                    <Blogs blogs={blogs} />
                </div>
            )}
        </div>
    )
}

export default Dashboard;