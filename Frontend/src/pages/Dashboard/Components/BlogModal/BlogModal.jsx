import React, { useState } from "react";
import './BlogModal.scss';

const BlogModal = ({ blog, onClose, onDelete, onUpdate, currentUser }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(blog.topic);
    const [editContent, setEditContent] = useState(blog.blog);

    const createdDate = new Date(blog.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // ---------- HANDLE UPDATE ----------
    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:5555/updateBlog", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                _id: blog._id,
                topic: editTitle,
                blog: editContent
            })
        });

        const data = await response.json();
        console.log("UPDATE RES:", data);

        if (data.ok) {
            alert("Blog Updated Successfully");
            onUpdate();      // refresh blogs in dashboard
            setIsEditing(false);
            onClose();       // close modal
        } else {
            alert(data.message);
        }
    };

    // ---------- HANDLE DELETE ----------
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:5555/deleteBlog", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ blogId: blog._id })
        });

        const data = await response.json();
        console.log("DELETE RES:", data);

        if (data.ok) {
            alert("Blog Deleted Successfully");
            onDelete();   // refresh dashboard
            onClose();    // close modal
        } else {
            alert(data.message);
        }
    };

    const isAuthor = blog.userId === currentUser?.id;

    return (
        <div className="blog-modal-overlay">
            <div className="blog-modal">
                <button className="close-btn" onClick={onClose}>✕</button>
                {blog.img && (
                    <img
                        className="modal-img"
                        src={`http://127.0.0.1:5555/uploads/${blog.img}`}
                        alt="blog"
                    />
                )}

                {/* EDIT MODE */}
                {isEditing ? (
                    <>
                        <input
                            className="edit-title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <textarea
                            className="edit-content"
                            rows="8"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        ></textarea>

                        <button className="save-btn" onClick={handleUpdate}>
                            Save Changes
                        </button>

                        <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h1>{blog.topic}</h1>
                        <p className="blog-text">{blog.blog}</p>

                        <div className="author-box">
                            <h4>Author — {blog.authorName || 'Unknown'}</h4>
                            <p>Created — {createdDate}</p>
                        </div>
                    </>
                )}

                {/* ACTION BUTTONS */}
                {isAuthor && !isEditing && (
                    <div className="actions">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            Edit Blog
                        </button>
                        <button className="delete-btn" onClick={handleDelete}>
                            Delete Blog
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogModal;