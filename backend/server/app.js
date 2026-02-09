import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;