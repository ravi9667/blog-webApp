import mongoose from "mongoose";

const blogDataSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogUser',
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