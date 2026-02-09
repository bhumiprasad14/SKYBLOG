import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

// Try to connect with multiple options
const connectDB = async () => {
  const connectionStrings = [
    process.env.MONGO_URI,
    "mongodb+srv://prasad14bhumi_db_user:LkvqzHdfD8aaGrei@cluster0.bec7cwd.mongodb.net/skyblog?retryWrites=true&w=majority",
    "mongodb://localhost:27017/skyblog",
  ];

  for (const connectionString of connectionStrings) {
    try {
      await mongoose.connect(connectionString);
      console.log("MongoDB connected successfully");
      console.log(
        "Using connection:",
        connectionString.split("@")[1] || "localhost",
      );
      return;
    } catch (error) {
      console.log(
        `Connection failed for ${connectionString.split("@")[1] || "localhost"}:`,
        error.message,
      );
    }
  }

  // If all connections fail
  console.log("\n=== MongoDB Connection Failed ===");
  console.log("To fix this issue:");
  console.log(
    "1. Install MongoDB locally: https://www.mongodb.com/try/download/community",
  );
  console.log("2. Or fix your MongoDB Atlas network access:");
  console.log("   - Go to MongoDB Atlas");
  console.log("   - Network Access → Add IP Address → Add your current IP");
  console.log(
    "   - Or use 0.0.0.0/0 (allows all IPs - not recommended for production)",
  );
  console.log("3. Check if your internet connection is working");
  console.log("4. Verify MongoDB Atlas cluster is running");

  // Continue without database for now
  console.log("\n⚠️  Server running without database connection");
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});