import React from "react";
import './Blogs.scss';

const Blogs = ({ blogs, user }) => {
    if (!blogs || blogs.length === 0) return <h2>No Blogs Found</h2>;

    return (
        <div className="blogs-list">
            {blogs.map((item) => {
                // Convert blog creation time to readable format: "17 November 2025"
                const blogCreatedTime = new Date(item.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });

                return (
                    <div key={item._id} className="blog-container">
                        {item.img && (
                            <img
                                src={`http://127.0.0.1:5555/uploads/${item.img}`}
                                alt="blog"
                            />
                        )}
                        <h1>{item.topic}</h1>
                        <p>{item.blog}</p>
                        <div>
                            <h4>{`Author - ${user?.name || 'Unknown'}`}</h4>
                            <p>{`Created At - ${blogCreatedTime}`}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Blogs;