import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogs as initialBlogs } from "../blogs";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout } = useAuth();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    content: "",
    date: "",
    tags: "",
    image: "",
    author: "Akash Banerjee"
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate, isAuthenticated, loading]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingId 
          ? {
              ...blog,
              title: formData.title,
              desc: formData.desc,
              content: formData.content,
              date: formData.date,
              tags: formData.tags.split(",").map(t => t.trim()),
              image: formData.image
            }
          : blog
      ));
      setEditingId(null);
    } else {
      // Create new blog
      const newBlog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: formData.title,
        desc: formData.desc,
        content: formData.content,
        date: formData.date,
        tags: formData.tags.split(",").map(t => t.trim()),
        image: formData.image,
        author: "Akash Banerjee"
      };
      setBlogs([newBlog, ...blogs]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      desc: "",
      content: "",
      date: "",
      tags: "",
      image: "",
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
      author: blog.author
    });
    setEditingId(blog.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
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
            <button onClick={() => setShowForm(true)} className="add-blog-btn">
              + Add New Blog
            </button>
          )}
        </div>

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

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingId ? "Update Blog" : "Create Blog"}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="blogs-list">
          <h2>All Blogs ({blogs.length})</h2>
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
                <tr key={blog.id}>
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
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
