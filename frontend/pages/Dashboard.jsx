import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const API_URL = "http://localhost:5000/api/blogs";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    content: "",
    date: "",
    tags: "",
    image: "",
    codeSnippet: "",
    author: "Akash Banerjee"
  });
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setApiLoading(true);
      setApiError("");
      const token = localStorage.getItem("authToken");
      const response = await fetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to fetch blogs from server");
      const data = await response.json();
      setBlogs(data || []);
      // Successfully fetched, even if empty
      setApiError("");
    } catch (err) {
      setApiError(err.message);
      setBlogs([]);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate, isAuthenticated, loading]);

  // Fetch blogs when component mounts
  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchBlogs();
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiLoading(true);
    setApiError("");
    setSuccessMessage("");
    
    try {
      const token = localStorage.getItem("authToken");
      const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);
      
      // Build payload with all fields explicitly
      const payload = {
        title: formData.title,
        desc: formData.desc,
        content: formData.content,
        date: formData.date,
        tags: tagsArray,
        image: formData.image,
        codeSnippet: String(formData.codeSnippet).trim() || "",
        author: formData.author
      };
      
      // Detailed logging
      console.log("==================================================");
      console.log("📋 FORM DATA:", formData);
      console.log("==================================================");
      console.log("📤 PAYLOAD BEING SENT:", JSON.stringify(payload, null, 2));
      console.log("==================================================");
      console.log("💻 CODE SNIPPET:", payload.codeSnippet);
      console.log("💻 CODE LENGTH:", payload.codeSnippet.length);
      console.log("==================================================");

      let response;
      if (editingId) {
        // UPDATE blog
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } else {
        // CREATE blog
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) throw new Error("Failed to save blog");
      
      const responseData = await response.json();
      console.log("✅ Server response:", responseData);
      console.log("💻 Code snippet in response:", responseData.codeSnippet);
      
      setSuccessMessage(editingId ? "Blog updated successfully!" : "Blog created successfully!");
      await fetchBlogs();
      resetForm();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setApiLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      desc: "",
      content: "",
      date: "",
      tags: "",
      image: "",
      codeSnippet: "",
      author: "Akash Banerjee"
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      desc: blog.desc,
      content: blog.content,
      date: blog.date,
      tags: blog.tags.join(", "),
      image: blog.image,
      codeSnippet: blog.codeSnippet || "",
      author: blog.author
    });
    setEditingId(blog._id || blog.id); // MongoDB uses _id
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setApiLoading(true);
      setApiError("");
      setSuccessMessage("");
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error("Failed to delete blog");
        
        // Immediately remove from local state for instant UI update
        setBlogs(blogs.filter(blog => (blog._id || blog.id) !== id));
        
        setSuccessMessage("Blog deleted successfully!");
        // Also fetch fresh data from server to ensure sync
        await fetchBlogs();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setApiError(err.message);
        // Refresh on error too to ensure consistency
        await fetchBlogs();
      } finally {
        setApiLoading(false);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="toolbar">
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="add-blog-btn" disabled={apiLoading}>
              + Add New Blog
            </button>
          )}
        </div>

        {successMessage && (
          <div className="success-message" style={{ padding: "10px", backgroundColor: "#efe", color: "#060", marginBottom: "15px", borderRadius: "4px" }}>
            ✓ {successMessage}
          </div>
        )}

        {showForm && (
          <div className="blog-form-container">
            <h2>{editingId ? "Edit Blog" : "Create New Blog"}</h2>
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Blog title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Short description"
                  required
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Full blog content"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
                {formData.image && (
                  <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#1e293b", borderRadius: "4px" }}>
                    <small style={{ color: "#94a3b8" }}>Preview:</small>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{ 
                        marginTop: "8px", 
                        width: "100%", 
                        maxHeight: "150px", 
                        objectFit: "cover", 
                        borderRadius: "4px"
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        const errorDiv = e.target.nextElementSibling;
                        if (errorDiv) errorDiv.style.display = "block";
                        console.error("❌ Image URL is invalid or unreachable:", formData.image);
                      }}
                    />
                    <div style={{ display: "none", marginTop: "10px", padding: "10px", backgroundColor: "#7f1d1d", borderRadius: "4px", color: "#fca5a5", fontSize: "0.9rem" }}>
                      <p style={{ margin: "0 0 8px 0" }}>⚠️ Invalid Image URL</p>
                      <p style={{ margin: "0 0 8px 0" }}>The URL provided doesn't point to a valid image file.</p>
                      <p style={{ margin: "0 0 8px 0" }}>Valid image URLs must end with: <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>.jpg</code>, <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>.png</code>, <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>.gif</code>, <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>.webp</code>, <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>.svg</code></p>
                      <p style={{ margin: "0" }}>Example: <code style={{backgroundColor: "#450a0a", padding: "2px 6px", borderRadius: "3px"}}>https://example.com/images/photo.jpg</code></p>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Web"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="January 28, 2026"
                  required
                />
              </div>

              <div className="form-group">
                <label>Code Snippet (Optional)</label>
                <textarea
                  name="codeSnippet"
                  value={formData.codeSnippet}
                  onChange={handleChange}
                  placeholder="Paste your code here... (indentation will be preserved)"
                  rows="8"
                  style={{ fontFamily: "monospace", fontSize: "0.9rem" }}
                />
                <small style={{ color: "#94a3b8", marginTop: "5px", display: "block" }}>
                  💡 Tip: Your code formatting and indentation will be preserved exactly as typed
                </small>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={apiLoading}>
                  {apiLoading ? "Saving..." : (editingId ? "Update Blog" : "Create Blog")}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn" disabled={apiLoading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="blogs-list">
          <h2>All Blogs ({blogs.length})</h2>
          
          {apiError && (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fee', borderRadius: '4px' }}>
              <h3 style={{ color: '#c00', marginBottom: '10px' }}>⚠️ Error Loading Blogs</h3>
              <p style={{ color: '#c00' }}>{apiError}</p>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#999' }}>Make sure the backend server is running on http://localhost:5000</p>
            </div>
          )}

          {!apiError && blogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3>No blogs yet</h3>
              <p>Start by creating your first blog using the "+ Add New Blog" button above.</p>
            </div>
          )}

          {!apiError && blogs.length > 0 && (
            <table className="blogs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id || blog.id}>
                    <td className="title-cell">{blog.title}</td>
                    <td>{blog.date}</td>
                    <td>
                      <div className="tag-list">
                        {blog.tags.map((tag, idx) => (
                          <span key={idx} className="tag-badge">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="edit-btn"
                        disabled={apiLoading}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id || blog.id)}
                        className="delete-btn"
                        disabled={apiLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
