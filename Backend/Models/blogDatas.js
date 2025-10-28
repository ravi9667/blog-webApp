import mongoose from "mongoose";

const blogDataSchema = mongoose.Schema({
    topic: {
        type: String,
        lowercase: true,
        required: true
    },
    blog: {
        type: String,
        lowercase: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
    }
})

export const blogData = mongoose.model("blogData", blogDataSchema)