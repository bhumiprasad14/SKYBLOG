import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../server/models/Blogs.js";

dotenv.config();

const clearBlogs = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    
    const connectionStrings = [
      process.env.MONGO_URI,
      "mongodb+srv://prasad14bhumi_db_user:LkvqzHdfD8aaGrei@cluster0.bec7cwd.mongodb.net/skyblog?retryWrites=true&w=majority",
      "mongodb://localhost:27017/skyblog",
    ];

    for (const connectionString of connectionStrings) {
      try {
        await mongoose.connect(connectionString);
        console.log("✅ Connected to MongoDB");
        break;
      } catch (error) {
        console.log(`Connection failed, trying next...`);
      }
    }

    console.log("🗑️  Deleting all blogs...");
    const result = await Blog.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} blogs from database`);
    
    console.log("📊 New blogs schema includes: title, desc, content, date, tags, image, author, codeSnippet");
    console.log("✨ Database is now ready for new blogs with code snippets!");
    
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

clearBlogs();
