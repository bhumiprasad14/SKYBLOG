import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: "Akash Banerjee"
    }
}, {
    timestamps: true // automatically adds createdAt & updatedAt
});

export default mongoose.model("Blog", blogSchema);
