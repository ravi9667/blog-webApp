import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { blogUsers } from './Models/blogUsers.js';
import { blogData } from './Models/blogDatas.js';

try {
    const mongoConnect = mongoose.connect("mongodb://localhost:27017/blogs")
    if(mongoConnect) {
        console.log("DB connected");
    }
} catch {
    console.log("Error connecting DB")
}

const app = express();

app.use(express.json())
app.use(cors())

const port = 5555;
const hostName = '127.0.0.1';

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

        const signupData = {
            name,
            email,
            password
        };

        await blogUsers.create(signupData)

        res.send({
            ok: true,
            message: "signUp Successfull"
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

        const result = await blogUsers.find({email: email, password: password});
        if(!result.length) {
            return res.send({
                ok: false,
                message: 'Email or password is incorrect'
            });
        }

        console.log("login data", result)
        res.send({
            ok: true,
            message: 'Login SuccessFully',
            data: {
                id: result[0]._id
            }
        })
    } catch(err) {
        console.log(`login ${err}`);
        res.send({
            ok: true,
            message: "login Failed"
        })
    }
});

app.get("/fetchUser", async (req, res) => {
    try {
        const {userId} = req.query;
        console.log(userId)
        if(!userId) {
            return res.send({
                ok: false,
                message: "UserId is required"
            })
        }

        const result = await blogUsers.find(
            {
                _id: userId
            },
            {
                _id: 0,
                name: 1,
                email: 1
            }
        );
        console.log(result)
        if (!result.length) {
            return res.send({
                ok: false,
                message: 'userId is incorrect'
            });
        }

        res.status(200).send({
            ok: true,
            data: result[0]
        })

    } catch(err) {     
        console.log("Error fetching user:", err);
        return res.send({
            ok: false,
            message: "failed to fatch User"
        });
    }

});

app.get("/fetchAllBlogs", async (req, res) => {
    try {
        const result = await blogData.find();
        console.log("All Blogs",result)

        res.status(200).send({
            ok: true,
            data: result
        })

    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to fetch All Blogs"
        });
    }
});

app.get("/fetchMyBlogs", async (req, res) => {
    try {
        const {userId} = req.query;
        console.log(userId)
        if(!userId) {
            return res.send({
                ok: false,
                message: "UserId is required"
            })
        }

        const result = await blogData.find({ _id: userId });
        console.log(result)
        if (!result.length) {
            return res.send({
                ok: false,
                message: 'Something issue with myBlogs'
            });
        }

        res.status(200).send({
            ok: true,
            data: result
        })

    } catch(err) {     
        console.log("Error fetching MyBlofgs:", err);
        return res.send({
            ok: false,
            message: "failed to fatch My Blogs"
        });
    }
})

app.post("/addBlog", async (req, res) => {
    try {
        const { topic, blog, userId } = req.body;

        if (!topic || !blog || !userId) {
            return res.send({
                ok: false,
                message: "All fields are required: topic, blog"
            });
        }

        const addBlogData = {
            topic,
            blog,
            userId
        }

        const addBlog = await blogData.create(addBlogData);
        res.status(200).send({
            ok: true,
            message: "Blog Added Successfully",
            data: addBlog
        });
    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to add Blog"
        });
    }
});

app.delete("/deleteBlog", async (req, res) => {
    try {
        const {blogId} = req.body;
        if(!blogId) {
            return res.send({
                ok: false,
                message: "blogId is required"
            })
        }

        const deleteBlog = await blogData.deleteOne({_id: blogId});
        if (deleteBlog.deletedCount === 1) {
            return res.status(200).send({
                ok: true,
                message: "blog Deleted Successfully"
            })

        }

    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to delete blog"
        });
    }
})

app.patch("/updateBlog", async (req, res) => {
    try {
        const { topic, blog, userId, _id } = req.body;
        
        if (!userId && !_id) {
            return res.send({
                ok: false,
                message: "userId and _id is required"
            });
        }
        if (!topic && !blog) {
            return res.send({
                ok: false,
                message: "At least one field (topic or blog) is required to update"
            });
        }

        const updateData = {};
        if (topic) updateData.topic = topic;
        if (blog) updateData.blog = blog;

        const updatedBlog = await blogData.findOneAndUpdate(
            { _id, userId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedBlog) {
            return res.send({
                ok: false,
                message: "Blog not found"
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