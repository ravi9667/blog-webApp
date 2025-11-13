import React from "react";
import "./Profile.scss";

const Profile = ({ onClose }) => {
    const handleLogout = () => {
        alert("Logged out successfully!");
        onClose();
    };

    return (
        <div className="profile-menu">
            <div className="profile-info">
                <p className="name">Ravi Ahirwar</p>
                <p className="email">ravi@gmail.com</p>
            </div>

            <hr />

            <button className="menu-item">All Blogs</button>
            <button className="menu-item">My Blogs</button>
            <button className="menu-item">Bookmarks</button>
            <button className="menu-item">Settings</button>

            <hr />

            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
