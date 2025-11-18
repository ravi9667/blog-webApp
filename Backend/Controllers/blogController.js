import { blogData } from "../Models/blogDatas.js";

export const fetchAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const blogs = await blogData
            .find()
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await blogData.countDocuments();

        res.send({
            ok: true,
            data: blogs,
            total,
            hasMore: page * limit < total
        });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Failed to fetch blogs" });
    }
};

export const fetchMyBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const userId = mongoose.Types.ObjectId(req.user._id); // convert to ObjectId

        const blogs = await blogData
            .find({ userId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await blogData.countDocuments({ userId });

        res.send({
            ok: true,
            data: blogs,
            total,
            hasMore: page * limit < total
        });
    } catch (err) {
        console.error("Fetch My Blogs Error:", err);
        res.status(500).send({ ok: false, message: "Failed to fetch my blogs" });
    }
};

export const addBlog = async (req, res) => {
    try {
        const { topic, blog } = req.body;

        const img = req.file ? req.file.filename : null;

        const newBlog = await blogData.create({
            topic,
            blog,
            img,
            userId: req.user.id
        });

        res.send({
            ok: true,
            message: "Blog Added Successfully",
            data: newBlog
        });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Failed to add blog" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.body;

        const deleted = await blogData.deleteOne({
            _id: blogId,
            userId: req.user.id
        });

        if (!deleted.deletedCount)
            return res.send({
                ok: false,
                message: "Blog not found"
            });

        res.send({ ok: true, message: "Blog deleted" });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Delete failed" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { topic, blog, _id } = req.body;

        const updated = await blogData.findOneAndUpdate(
            { _id, userId: req.user.id },
            { $set: { topic, blog } },
            { new: true }
        );

        if (!updated)
            return res.send({
                ok: false,
                message: "Not authorized or blog not found"
            });

        res.send({
            ok: true,
            message: "Updated",
            data: updated
        });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Update failed" });
    }
};
