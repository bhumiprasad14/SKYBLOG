import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/blog-detail.css";

const API_URL = "http://localhost:5000/api/blogs";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Blog not found");
        const data = await response.json();
        console.log("📖 Blog fetched:", data);
        console.log("💻 Code snippet:", data.codeSnippet);
        setBlog(data);
        setError("");
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-detail-container">
        <Link to="/blogs" className="back-link">← Back to blogs</Link>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-container">
        <p className="error">Blog not found</p>
        <Link to="/blogs" className="back-link">← Back to blogs</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <Link to="/blogs" className="back-link">← Back to blogs</Link>
      
      <article className="blog-detail">
        <header className="blog-header">
          <h1>{blog.title}</h1>
          <div className="blog-meta">
            <span className="author">By {blog.author}</span>
            <span className="date">{blog.date}</span>
          </div>
        </header>

        <img 
          src={blog.image} 
          alt={blog.title} 
          className="blog-featured-image"
          onError={() => {
            console.error("❌ Failed to load featured image:", blog.image);
            setImageError(true);
          }}
          style={imageError ? { display: "none" } : {}}
        />
        {imageError && (
          <div style={{ width: "100%", minHeight: "300px", backgroundColor: "#1e293b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "8px", marginBottom: "20px", padding: "20px" }}>
            <div style={{ textAlign: "center", color: "#94a3b8", maxWidth: "500px" }}>
              <p style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#fca5a5" }}>❌ Image Failed to Load</p>
              <p style={{ marginBottom: "10px", fontSize: "0.95rem" }}>The image URL provided is not a valid image file.</p>
              <p style={{ marginBottom: "15px", fontSize: "0.9rem", fontFamily: "monospace", wordBreak: "break-all", backgroundColor: "#0f172a", padding: "10px", borderRadius: "4px" }}>{blog.image}</p>
              <p style={{ marginBottom: "10px", fontSize: "0.9rem", color: "#cbd5e1" }}>⚠️ Image URLs must point directly to image files (.jpg, .png, .gif, .webp, .svg)</p>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Not to web pages. For example: https://example.com/photo.jpg ✓</p>
            </div>
          </div>
        )}

        <div className="blog-tags">
          {blog.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>

        <div className="blog-content">
          <p>{blog.desc}</p>
          <p>{blog.content}</p>
          
          {blog.codeSnippet && String(blog.codeSnippet).trim().length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <div style={{ padding: "20px", backgroundColor: "#0f172a", borderRadius: "8px", border: "2px solid #3b82f6", overflow: "auto" }}>
                <h3 style={{ marginTop: "0", marginBottom: "15px", color: "#60a5fa", fontSize: "1.2rem", fontWeight: "600" }}>
                  💻 Code Snippet
                </h3>
                <pre style={{
                  margin: "0",
                  color: "#e2e8f0",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  backgroundColor: "#000814",
                  padding: "15px",
                  borderRadius: "4px",
                  border: "1px solid #1e293b",
                  overflowX: "auto",
                  maxHeight: "500px"
                }}>
{blog.codeSnippet}
                </pre>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}