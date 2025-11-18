import express from "express";
import { fetchUser } from "../Controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/fetchUser", verifyToken, fetchUser);

export default router;