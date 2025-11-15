import React, { useState } from "react";
import './AddBlog.scss';

const AddBlog = ({ onClose }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img', image);
        formData.append('topic', title);
        formData.append('blog', content)

        try {
            const response = await fetch("http://127.0.0.1:5555/addBlog", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            })

            const data = await response.json()
            console.log("Add Blog Res:", data)

            if (data.ok) {
                alert("Blog Added Successfully");
                onClose(); // close modal
            } else {
                alert(data.message);
            }

            setImage(null);
            setTitle("");
            setContent("");
        } catch {
            console.error("Error adding blog:", error);
            alert("Something went wrong");
        }
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
                        <button type="submit" className="submit-btn" onClick={handleSubmit}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
