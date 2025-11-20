import React, { useState } from "react";
import { patchData, deleteData } from "../../../../apiRoutes";
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

    // Update blog
    const handleUpdate = async () => {
        const data = await patchData("http://127.0.0.1:5555/updateBlog", {
            _id: blog._id,
            topic: editTitle,
            blog: editContent
        });

        if (data.ok) {
            alert("Blog Updated Successfully");
            onUpdate();
            setIsEditing(false);
            onClose();
        } else {
            alert(data.message);
        }
    };

    // Delete blog
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        const data = await deleteData("http://127.0.0.1:5555/deleteBlog", {
            blogId: blog._id
        });

        if (data.ok) {
            alert("Blog Deleted Successfully");
            onDelete();
            onClose();
        } else {
            alert(data.message);
        }
    };

    const isAuthor = blog.userId?._id.toString() === currentUser?._id.toString();

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
                        <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
                        <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h1>{blog.topic}</h1>
                        <p className="blog-text">{blog.blog}</p>

                        <div className="author-box">
                            <h4>Author — {blog.userId?.name || 'Unknown'}</h4>
                            <p>Created — {createdDate}</p>
                        </div>
                    </>
                )}
                {isAuthor && !isEditing && (
                    <div className="actions">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Blog</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete Blog</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogModal;