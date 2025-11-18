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

    // Fetch user
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

    // Fetch blogs with pagination
    const fetchBlogs = async (currentPage = 1) => {
        if (!hasMore && currentPage !== 1) return;
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:5555/fetchAllBlogs?page=${currentPage}&limit=12`);
            const data = await res.json();

            if (data.ok) {
                setBlogs(prev => currentPage === 1 ? data.data : [...prev, ...data.data]);
                setHasMore(data.hasMore);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log("Fetch blogs error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Infinite scroll handler
    const observer = useRef();
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

    useEffect(() => {
        getUser();
        fetchBlogs(1);
    }, []);

    useEffect(() => {
        if (page === 1) return;
        fetchBlogs(page);
    }, [page]);

    // Refresh after add/edit/delete
    const refreshBlogs = () => {
        setPage(1);
        fetchBlogs(1);
    };

    return (
        <div className="dashboard-container">
            <Header
                user={user}
                fetchAllBlogs={refreshBlogs}
                fetchMyBlogs={() => alert("My Blogs not implemented for infinite scroll")}
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
                    onUpdate={refreshBlogs}
                    onDelete={refreshBlogs}
                />
            )}
        </div>
    );
};

export default Dashboard;