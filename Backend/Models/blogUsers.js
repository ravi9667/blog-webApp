import mongoose from "mongoose";

const blogUserSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const blogUsers = mongoose.model("blogUser", blogUserSchema);