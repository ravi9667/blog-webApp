import React, { useState } from "react";
import logo from '../../../../assets/peercoin.png';
import AddBlog from "./components/AddBlog/AddBlog";
import './Header.scss';

const Header = () => {
    const [showAddBlog, setShowAddBlog] = useState(false);

    const handleAddBlog = () => {
        setShowAddBlog(true);
    };

    const closeAddBlog = () => {
        setShowAddBlog(false);
    };

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
                    <button className="profile">RA</button>
                </div>
            </div>

            {showAddBlog && <AddBlog onClose={closeAddBlog} />}
        </>
    );
}

export default Header;
