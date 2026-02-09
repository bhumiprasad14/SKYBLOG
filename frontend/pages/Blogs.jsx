import { Link } from "react-router-dom";
import { blogs } from "../blogs";
import "../styles/blogs.css";

export default function Blogs() {
  return (
    <div className="blogs-container">
      <h1>All Articles</h1>
      <p className="page-subtitle">Browse all our in-depth articles on web development</p>
      
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <div className="card-image-wrapper">
              <img src={blog.image} alt={blog.title} className="card-image" />
            </div>
            <div className="card-content">
              <h3>{blog.title}</h3>
              <p className="card-description">{blog.desc}</p>
              <div className="card-tags">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <div className="card-footer">
                <span className="card-author">Admin</span>
                <span className="card-date">{blog.date}</span>
              </div>
              <Link to={`/blog/${blog.id}`} className="read-more">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}