import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "./Components/Header/Header";
import BlogBackground from "./Components/BlogBackground/BlogBackground";
import Blogs from "./Components/Blogs/Blogs";
import Loader from "../../ReusableComponents/Loader/Loader";
import BlogModal from "./Components/BlogModal/BlogModal";
import './style.scss';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [mode, setMode] = useState("all"); // "all" or "mine"

    const observer = useRef();

    // Fetch logged-in user
    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://127.0.0.1:5555/fetchUser", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.ok) setUser(data.data);
        } catch (err) {
            console.log("Fetch user error:", err);
        }
    };

    // Fetch blogs (all or mine) with pagination
    const fetchBlogs = async (currentPage = 1, currentMode = mode) => {
        setLoading(true);
        try {
            const url =
                currentMode === "all"
                    ? `http://127.0.0.1:5555/fetchAllBlogs?page=${currentPage}&limit=12`
                    : `http://127.0.0.1:5555/fetchMyBlogs?page=${currentPage}&limit=12`;

            const headers =
                currentMode === "mine"
                    ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    : {};

            const res = await fetch(url, { headers });
            const data = await res.json();

            if (data.ok) {
                setBlogs(prev =>
                    currentPage === 1 ? data.data : [...prev, ...data.data]
                );
                setHasMore(data.hasMore);
            }
        } catch (err) {
            console.log("Fetch blogs error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Infinite scroll observer
    const lastBlogRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // First load
    useEffect(() => {
        getUser();
        fetchBlogs(1, "all");
    }, []);

    // Handle page changes for infinite scroll
    useEffect(() => {
        if (page === 1) return;
        fetchBlogs(page, mode);
    }, [page]);

    // Switch to all blogs
    const handleAllBlogs = () => {
        setMode("all");
        setPage(1);
        fetchBlogs(1, "all");
    };

    // Switch to my blogs
    const handleMyBlogs = () => {
        if (!user) return alert("Please log in first");
        setMode("mine");
        setPage(1);
        fetchBlogs(1, "mine");
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
                    onUpdate={() => fetchBlogs(1, mode)}
                    onDelete={() => fetchBlogs(1, mode)}
                />
            )}
        </div>
    );
};

export default Dashboard;