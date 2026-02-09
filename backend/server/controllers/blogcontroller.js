import Blog from "../models/Blogs.js";

// CREATE blog
export const createBlog = async (req, res) => {
    try {
        console.log("📥 Received blog data:", req.body);
        console.log("💻 Code snippet received:", req.body.codeSnippet);
        console.log("💻 Code snippet length:", req.body.codeSnippet ? req.body.codeSnippet.length : 0);
        
        const blog = await Blog.create(req.body);
        
        console.log("✅ Blog created:", blog);
        console.log("💻 Code snippet in created blog:", blog.codeSnippet);
        
        res.status(201).json(blog);
    } catch (err) {
        console.error("❌ Error creating blog:", err);
        res.status(500).json({ message: err.message });
    }
};

// GET all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE blog
export const updateBlog = async (req, res) => {
    try {
        console.log("📥 Received update data:", req.body);
        console.log("💻 Code snippet in update:", req.body.codeSnippet);
        
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log("✅ Blog updated:", blog);
        res.json(blog);
    } catch (err) {
        console.error("❌ Error updating blog:", err);
        res.status(500).json({ message: err.message });
    }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ message: "Blog deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};