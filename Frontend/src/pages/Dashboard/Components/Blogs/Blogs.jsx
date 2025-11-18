import React from "react";
import './Blogs.scss';

const Blogs = ({ blogs, user, onBlogClick, lastBlogRef }) => {
    if (!blogs || blogs.length === 0) return <h2
        style={{
            marginTop: '100px',
            textAlign: 'center',
            color: '#3b3b3bff',
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            fontWeight: 600,
        }}
    >
        No Blogs Found
    </h2>;

    return (
        <div className="blogs-list">
            {blogs.map((blog, index) => {
                const blogCreatedTime = new Date(blog.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });

                const isLast = blogs.length === index + 1;

                return (
                    <div
                        key={blog._id}
                        className="blog-container"
                        ref={isLast ? lastBlogRef : null}
                        onClick={() => onBlogClick(blog)}
                        style={{ cursor: 'pointer' }}
                    >
                        {blog.img && (
                            <img
                                src={`http://127.0.0.1:5555/uploads/${blog.img}`}
                                alt="blog"
                            />
                        )}
                        <h1>{blog.topic}</h1>
                        <p>{blog.blog}</p>
                        <div>
                            <h4>{`Author - ${blog.userId?.name ? blog.userId.name : 'Unknown'}`}</h4>
                            <p>{`Created At - ${blogCreatedTime}`}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Blogs;