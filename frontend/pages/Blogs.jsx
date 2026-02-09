import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/blogs.css";

const API_URL = "http://localhost:5000/api/blogs";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("📡 Fetching blogs from:", API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        console.log("📨 Response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Blogs fetched successfully:", data);
          setBlogs(data || []);
        } else {
          console.warn("⚠️ Response not OK, status:", response.status);
          const errorText = await response.text();
          console.warn("Error response:", errorText);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    // Fetch only once when component mounts
  }, []);

  const handleImageError = (blogId) => {
    setImageErrors(prev => ({
      ...prev,
      [blogId]: true
    }));
  };

  const handleRefresh = async () => {
    try {
      console.log("🔄 Manually refreshing blogs...");
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Blogs refreshed:", data);
        setBlogs(data || []);
      }
    } catch (err) {
      console.error("❌ Refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blogs-container">
        <h1>All Articles</h1>
        <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
      </div>
    );
  }

  if (loading && blogs.length === 0) {
    return (
      <div className="blogs-container">
        <h1>All Articles</h1>
        <p className="page-subtitle">Browse all our in-depth articles on web development</p>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1>All Articles</h1>
          <p className="page-subtitle">Browse all our in-depth articles on web development</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            fontSize: "0.95rem",
            fontWeight: "600"
          }}
        >
          {loading ? "Loading..." : "🔄 Refresh"}
        </button>
      </div>
      
      {blogs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>No blogs available</h3>
          <p style={{ color: "#94a3b8" }}>Check back later for new content!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <article key={blog._id || blog.id} className="blog-card">
              <div className="card-image-wrapper">
                {imageErrors[blog._id || blog.id] ? (
                  <div style={{ width: "100%", height: "200px", backgroundColor: "#1e293b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8", padding: "10px", textAlign: "center" }}>
                    <span style={{ fontSize: "0.9rem" }}>❌ Image failed to load</span>
                    <small style={{ marginTop: "5px", color: "#64748b", fontSize: "0.75rem" }}>URL: {blog.image.substring(0, 40)}...</small>
                  </div>
                ) : (
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="card-image"
                    onError={(e) => {
                      console.error(`❌ Failed to load image for blog "${blog.title}":`, blog.image);
                      handleImageError(blog._id || blog.id);
                    }}
                  />
                )}
              </div>
              <div className="card-content">
                <h3>{blog.title}</h3>
                <p className="card-description">{blog.desc}</p>
                <div className="card-tags">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                {blog.codeSnippet && (
                  <div style={{ marginTop: "10px", padding: "8px 12px", backgroundColor: "#1e293b", borderRadius: "4px", fontSize: "0.8rem", color: "#60a5fa", display: "inline-block" }}>
                    💻 Code Included
                  </div>
                )}
                <div className="card-footer">
                  <span className="card-author">{blog.author || "Admin"}</span>
                  <span className="card-date">{blog.date}</span>
                </div>
                <Link to={`/blog/${blog._id || blog.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}