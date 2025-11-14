import React, { useState } from "react";
import logo from '../../../../assets/peercoin.png';
import AddBlog from "../../Components/AddBlog/AddBlog";
import Profile from "../Profile/Profile";
import './Header.scss';

const Header = ({user}) => {
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    console.log(user)

    const getInitials = () => {
        if( !user || !user.name) {
            return 'U';
        }

        const parts = user.name.trim().split(" ");
        const first = parts[0][0].toUpperCase();
        const last = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : "";
        return first + last;
    }

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
                    <button className="add-blog" onClick={() => setShowAddBlog(true)}>+</button>

                    <div className="profile-wrapper">
                        <button className="profile" onClick={() => setShowProfile(!showProfile)}>{getInitials()}</button>

                        {showProfile && (
                            <Profile user={user} onClose={() => setShowProfile(false)} />
                        )}
                    </div>
                </div>
            </div>

            {showAddBlog && <AddBlog onClose={() => setShowAddBlog(false)} />}
        </>
    );
};

export default Header;
