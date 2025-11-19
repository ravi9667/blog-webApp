import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "./Components/Header/Header";
import BlogBackground from "./Components/BlogBackground/BlogBackground";
import Blogs from "./Components/Blogs/Blogs";
import Loader from "../../ReusableComponents/Loader/Loader";
import BlogModal from "./Components/BlogModal/BlogModal";
import "./style.scss";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [mode, setMode] = useState("all");

    const observer = useRef();

    // ---------------------------
    // Fetch logged-in user
    // ---------------------------
    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://127.0.0.1:5555/fetchUser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.ok) setUser(data.data);
        } catch (err) {
            console.log("Fetch user error:", err);
        }
    };

    // ---------------------------
    // 1) Fetch All Blogs
    // ---------------------------
    const fetchAllBlogs = async (currentPage = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://127.0.0.1:5555/fetchAllBlogs?page=${currentPage}&limit=12`
            );

            const data = await res.json();

            if (data.ok) {
                setBlogs((prev) =>
                    currentPage === 1 ? data.data : [...prev, ...data.data]
                );
                setHasMore(data.hasMore);
                console.log("sdat", data)
            }
        } catch (err) {
            console.log("Fetch All Blogs error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------
    // 2) Fetch My Blogs
    // ---------------------------
    const fetchMyBlogs = async (currentPage = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `http://127.0.0.1:5555/fetchMyBlogs?page=${currentPage}&limit=12`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();

            if (data.ok) {
                setBlogs((prev) =>
                    currentPage === 1 ? data.data : [...prev, ...data.data]
                );
                setHasMore(data.hasMore);
                console.log(data)
            }
        } catch (err) {
            console.log("Fetch My Blogs error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------
    // Infinite Scroll Observer
    // ---------------------------
    const lastBlogRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // ---------------------------
    // First load
    // ---------------------------
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) getUser();
        fetchAllBlogs(1);
    }, []);

    // ---------------------------
    // When page changes (infinite scroll)
    // ---------------------------
    useEffect(() => {
        if (page === 1) return;

        if (mode === "all") {
            fetchAllBlogs(page);
        } else {
            if (user) {
                fetchMyBlogs(page);
            }
        }
    }, [page, user]);

    // ---------------------------
    // Switch to All Blogs
    // ---------------------------
    const handleAllBlogs = () => {
        setMode("all");
        setPage(1);
        fetchAllBlogs(1);
    };

    // ---------------------------
    // Switch to My Blogs
    // ---------------------------
    const handleMyBlogs = () => {
        if (!user) {
            alert("Please log in first");
            return;
        }

        setMode("mine");
        setBlogs([]);   // clear previous blogs
        setPage(1);
        fetchMyBlogs(1);
    };

    return (
        <div className="dashboard-container">
            <Header
                user={user}
                fetchAllBlogs={handleAllBlogs}
                fetchMyBlogs={handleMyBlogs}
            />

            <BlogBackground />

            <div className="blogs">
                <Blogs
                    blogs={blogs}
                    user={user}
                    onBlogClick={(blog) => setSelectedBlog(blog)}
                    lastBlogRef={lastBlogRef}
                />
                {loading && <Loader />}
            </div>

            {selectedBlog && (
                <BlogModal
                    blog={selectedBlog}
                    currentUser={user}
                    onClose={() => setSelectedBlog(null)}
                    onUpdate={() =>
                        mode === "all" ? fetchAllBlogs(1) : fetchMyBlogs(1)
                    }
                    onDelete={() =>
                        mode === "all" ? fetchAllBlogs(1) : fetchMyBlogs(1)
                    }
                />
            )}
        </div>
    );
};

export default Dashboard;
