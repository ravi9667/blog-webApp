import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { upload } from "../Middleware/upload.js";
import {
    fetchAllBlogs,
    fetchMyBlogs,
    addBlog,
    deleteBlog,
    updateBlog
} from "../Controllers/blogController.js";

const router = express.Router();

router.get("/fetchAllBlogs", fetchAllBlogs);
router.get("/fetchMyBlogs", verifyToken, fetchMyBlogs);
router.post("/addBlog", verifyToken, upload.single("img"), addBlog);
router.delete("/deleteBlog", verifyToken, deleteBlog);
router.patch("/updateBlog", verifyToken, updateBlog);

export default router;