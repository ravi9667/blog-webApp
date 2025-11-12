import React, { useState } from "react";
import './AddBlog.scss';

const AddBlog = ({ onClose }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // You can later connect this to your backend or state
        console.log({
            image,
            title,
            content
        });

        // Clear inputs
        setImage(null);
        setTitle("");
        setContent("");
        onClose();
    };

    return (
        <div className="add-blog-overlay">
            <div className="add-blog-modal">
                <h2>Add New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <label>Blog Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    <label>Blog Heading:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        required
                    />

                    <label>Blog Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog..."
                        rows="6"
                        required
                    ></textarea>

                    <div className="buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
