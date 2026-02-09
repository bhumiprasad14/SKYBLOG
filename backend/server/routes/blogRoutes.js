import express from "express";
import {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getSingleBlog
} from "../controllers/blogcontroller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public read routes (no auth required)
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);

// Protected write routes (auth required)
router.use(authMiddleware);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
