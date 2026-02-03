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

// protect all routes
router.use(authMiddleware);

router.post("/", createBlog);
router.get("/:id",getSingleBlog);
router.get("/", getBlogs);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
