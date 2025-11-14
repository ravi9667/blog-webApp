import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken'
import { blogUsers } from './Models/blogUsers.js';
import { blogData } from './Models/blogDatas.js';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

try {
    const mongoConnect = mongoose.connect("mongodb://localhost:27017/blogs")
    if(mongoConnect) {
        console.log("DB connected");
    }
} catch {
    console.log("Error connecting DB")
}

const port = process.env.PORT || 5555;
const hostName = '127.0.0.1';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // FIXED
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'no token provided'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                ok: false,
                message: 'invalid or expired token'
            });
        }

        req.user = decoded;
        next();
    });
};


app.get("/", (req, res) => {
    res.send("this is Home Tab")
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.send({
                ok: false,
                message: 'all fields are required: name, email, password !!'
            });
        }

        const existingUser = await blogUsers.findOne({email: email});
        if(existingUser) {
            return res.send({
                ok: false,
                message: "Email id already Registered !!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await blogUsers.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.send({
            ok: true,
            message: "signUp Successful",
            token
        })

    } catch(err) {
        console.log("signUp", err);
        res.send({
            ok: false,
            message: "signUp Failed"
        })
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.send({
                ok: false,
                message: "All fields are required: email, password"
            })
        }

        const user = await blogUsers.findOne({ email });
        if (!user) {
            return res.send({
                ok: false,
                message: 'Email is incorrect or Not found !!'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.send({
                ok: false,
                message: 'Password is Incorrect !!'
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        console.log("login data", user)
        res.send({
            ok: true,
            message: 'Login SuccessFully',
            token
        })
    } catch(err) {
        console.log(`login ${err}`);
        res.send({
            ok: true,
            message: "login Failed"
        })
    }
});

app.get("/fetchUser", verifyToken, async (req, res) => {
    try {
        const user = await blogUsers.findById(req.user.id, {
            _id: 0,
            name: 1,
            email: 1
        });

        if (!user) {
            return res.send({
                ok: false,
                message: 'User not found'
            });
        }

        res.status(200).send({
            ok: true,
            data: user
        });
    } catch (err) {
        console.log("Error fetching user:", err);
        return res.send({
            ok: false,
            message: "Failed to fetch User"
        });
    }
});

// ✅ FETCH ALL BLOGS (Public)
app.get("/fetchAllBlogs", async (req, res) => {
    try {
        const result = await blogData.find();
        res.status(200).send({ ok: true, data: result });
    } catch (err) {
        console.log(err);
        return res.send({
            ok: false,
            message: "Failed to fetch All Blogs"
        });
    }
});

// ✅ FETCH MY BLOGS (Protected)
app.get("/fetchMyBlogs", verifyToken, async (req, res) => {
    try {
        const result = await blogData.find({ userId: req.user.id });
        res.status(200).send({
            ok: true,
            data: result
        });
    } catch (err) {
        console.log("Error fetching MyBlogs:", err);
        return res.send({
            ok: false,
            message: "Failed to fetch My Blogs"
        });
    }
});

// ✅ ADD BLOG (Protected)
app.post("/addBlog", verifyToken, async (req, res) => {
    try {
        const { topic, blog } = req.body;

        if (!topic || !blog) {
            return res.send({
                ok: false,
                message: "All fields are required: topic, blog"
            });
        }

        const addBlog = await blogData.create({
            topic,
            blog,
            userId: req.user.id
        });

        res.status(200).send({
            ok: true,
            message: "Blog Added Successfully",
            data: addBlog
        });
    } catch (err) {
        console.log(err);
        return res.send({
            ok: false,
            message: "Failed to add Blog"
        });
    }
});

// ✅ DELETE BLOG (Protected)
app.delete("/deleteBlog", verifyToken, async (req, res) => {
    try {
        const { blogId } = req.body;
        if (!blogId) {
            return res.send({
                ok: false,
                message: "blogId is required"
            });
        }

        const deleted = await blogData.deleteOne({
            _id: blogId,
            userId: req.user.id
        });

        if (deleted.deletedCount === 1) {
            return res.status(200).send({
                ok: true,
                message: "Blog Deleted Successfully"
            });
        }

        res.send({
            ok: false,
            message: "Blog not found or not authorized"
        });

    } catch (err) {
        console.log(err);
        return res.send({
            ok: false,
            message: "Failed to delete blog"
        });
    }
});

// ✅ UPDATE BLOG (Protected)
app.patch("/updateBlog", verifyToken, async (req, res) => {
    try {
        const { topic, blog, _id } = req.body;

        if (!_id) {
            return res.send({
                ok: false,
                message: "Blog _id is required"
            });
        }

        const updateData = {};
        if (topic) updateData.topic = topic;
        if (blog) updateData.blog = blog;

        const updatedBlog = await blogData.findOneAndUpdate(
            { _id, userId: req.user.id },
            { $set: updateData },
            { new: true }
        );

        if (!updatedBlog) {
            return res.send({
                ok: false,
                message: "Blog not found or not authorized"
            });
        }

        res.send({
            ok: true,
            message: "Blog Updated Successfully",
            data: updatedBlog
        });

    } catch (err) {
        console.log(err);
        return res.send({
            ok: false,
            message: "Failed to update Blog"
        });
    }
});


app.listen(port, hostName, () => {
    console.log(`Server is Running on http://${hostName}:${port}`)
});