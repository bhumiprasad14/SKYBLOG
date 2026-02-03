import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;
