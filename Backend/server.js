import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import path from "path";

import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/blogs")
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("DB Connection Failed"));

// routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", blogRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () =>
    console.log(`Server running at http://127.0.0.1:${PORT}`)
);