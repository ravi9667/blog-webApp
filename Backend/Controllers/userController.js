import { blogUsers } from "../Models/blogUsers.js";

export const fetchUser = async (req, res) => {
    try {
        const user = await blogUsers.findById(req.user.id, {
            name: 1,
            email: 1
        });

        if (!user)
            return res.send({ ok: false, message: "User not found" });

        res.send({ ok: true, data: user });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Failed to fetch user" });
    }
};