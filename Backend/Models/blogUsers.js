import mongoose from "mongoose";

const blogUserSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const blogUsers = mongoose.model("blogUser", blogUserSchema);