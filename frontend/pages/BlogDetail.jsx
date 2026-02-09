import { useParams, Link } from "react-router-dom";
import { blogs } from "../blogs";
import "../styles/blog-detail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
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

        <img src={blog.image} alt={blog.title} className="blog-featured-image" />

        <div className="blog-tags">
          {blog.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>

        <div className="blog-content">
          <p>{blog.desc}</p>
          <p>{blog.content}</p>
        </div>
      </article>
    </div>
  );
}