import React from "react";
import './Blogs.scss';

const Blogs = ({ blogs }) => {
    if (!blogs.length) return <h2>No Blogs Found</h2>;

    return (
        <div className="blogs-list">
            {blogs.map((item) => (
                <div key={item._id} className="blog-container">
                    {item.img && (
                        <img
                            src={`http://127.0.0.1:5555/uploads/${item.img}`}
                            alt="blog"
                        />
                    )}
                    <h1>{item.topic}</h1>
                    <p>{item.blog}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
