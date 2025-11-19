import React, { useState } from "react";
import logo from '../../../../assets/peercoin.png';
import AddBlog from "../Header/Components/AddBlog/AddBlog"
import Profile from "./Components/Profile/Profile"
import './Header.scss';

const Header = ({ user, fetchAllBlogs, fetchMyBlogs }) => {
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const getInitials = () => {
        if (!user || !user.name) return 'U';
        const parts = user.name.trim().split(" ");
        return parts[0][0].toUpperCase() + (parts[1]?.[0]?.toUpperCase() || "");
    };

    return (
        <>
            <div className="header-container">
                <div className="blogger">
                    <img src={logo} alt="logo" width={35} />
                    <p>Blogger</p>
                </div>
                <div className="sections">
                    <button className="all-blogs" onClick={fetchAllBlogs}>All Blogs</button>
                    <button className="my-blogs" onClick={fetchMyBlogs}>My Blogs</button>

                    <button className="add-blog" onClick={() => setShowAddBlog(true)}>+</button>

                    <div className="profile-wrapper">
                        <button className="profile" onClick={() => setShowProfile(!showProfile)}>{getInitials()}</button>
                        {showProfile && (
                            <Profile user={user} onClose={() => setShowProfile(false)} />
                        )}
                    </div>
                </div>
            </div>

            {showAddBlog && (
                <AddBlog
                    onClose={() => setShowAddBlog(false)}
                    onBlogAdded={fetchAllBlogs}
                />
            )}
        </>
    );
};

export default Header;
