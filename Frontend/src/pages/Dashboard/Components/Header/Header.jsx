import React, { useState } from "react";
import logo from '../../../../assets/peercoin.png';
import AddBlog from "../../Components/AddBlog/AddBlog";
import Profile from "../Profile/Profile";
import './Header.scss';

const Header = () => {
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleAddBlog = () => setShowAddBlog(true);
    const closeAddBlog = () => setShowAddBlog(false);

    const toggleProfile = () => setShowProfile(!showProfile);
    const closeProfile = () => setShowProfile(false);

    return (
        <>
            <div className="header-container">
                <div className="blogger">
                    <img src={logo} alt="Blogger-logo" width={35}/>
                    <p>Blogger</p>
                </div>

                <div className="sections">
                    <button className="all-blogs">All Blogs</button>
                    <button className="my-blogs">My Blogs</button>
                    <button className="add-blog" onClick={handleAddBlog}>+</button>

                    <div className="profile-wrapper">
                        <button className="profile" onClick={toggleProfile}>RA</button>
                        {showProfile && <Profile onClose={closeProfile} />}
                    </div>
                </div>
            </div>

            {showAddBlog && <AddBlog onClose={closeAddBlog} />}
        </>
    );
};

export default Header;
