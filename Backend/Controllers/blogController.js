// blogController.js
import { blogData } from "../Models/blogDatas.js";
import mongoose from "mongoose";

// Fetch all blogs (public)
export const fetchAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const blogs = await blogData
            .find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await blogData.countDocuments();

        res.send({
            ok: true,
            data: blogs,
            total,
            hasMore: page * limit < total,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to fetch blogs" });
    }
};

// Fetch blogs of logged-in user
export const fetchMyBlogs = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        // Convert string _id from JWT to ObjectId
        const userId = new mongoose.Types.ObjectId(req.user._id);
        console.log(typeof userId, userId)

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        console.log(page, limit, skip);

        const blogs = await blogData
            .find({ userId: userId })
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log("blogs fetched for user:", blogs);

        const total = await blogData.countDocuments({ userId });

        res.send({
            ok: true,
            data: blogs,
            total,
            hasMore: page * limit < total,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to fetch user blogs" });
    }
};

// Add new blog
export const addBlog = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const { topic, blog } = req.body;
        const img = req.file ? req.file.filename : null;

        const newBlog = await blogData.create({
            topic,
            blog,
            img,
            userId: new mongoose.Types.ObjectId(req.user._id), // ensure ObjectId type
        });

        res.send({
            ok: true,
            message: "Blog Added Successfully",
            data: newBlog,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to add blog" });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.body;

        const deleted = await blogData.deleteOne({
            _id: blogId,
            userId: new mongoose.Types.ObjectId(req.user._id),
        });

        if (!deleted.deletedCount)
            return res.send({ ok: false, message: "Blog not found or unauthorized" });

        res.send({ ok: true, message: "Blog deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Delete failed" });
    }
};

// Update a blog
export const updateBlog = async (req, res) => {
    try {
        const { topic, blog, _id } = req.body;

        const updated = await blogData.findOneAndUpdate(
            { _id, userId: new mongoose.Types.ObjectId(req.user._id) },
            { $set: { topic, blog } },
            { new: true }
        );

        if (!updated)
            return res.send({ ok: false, message: "Not authorized or blog not found" });

        res.send({ ok: true, message: "Blog updated", data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Update failed" });
    }
};