import { Link } from "react-router-dom";
import { blogs } from "../blogs";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section with Author Profile */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SkyBlog</h1>
          <p className="hero-subtitle">
            Explore insights on modern web development, programming, and technology
          </p>
        </div>
      </section>

      {/* Author Profile */}
      <section className="author-section">
        <div className="author-card">
          <img 
            src="https://images.unsplash.com/photo-1733231291506-34503f83f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdXRob3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk5NjI5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Akash Banerjee"
            className="author-avatar"
          />
          <div className="author-info">
            <h2>Akash Banerjee</h2>
            <p className="author-title">Full-stack Developer & Tech Writer</p>
            <p className="author-bio">
              Full-stack developer and tech writer with 8+ years of experience. Passionate
              about building scalable web applications and sharing knowledge through clear,
              practical tutorials. Specializing in React, Node.js, and cloud architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="blogs-section">
        <h2 className="section-title">Latest Articles</h2>
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
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About SkyBlog</h2>
        <p>
          SkyBlog is a platform dedicated to sharing in-depth knowledge about modern web
          development, programming best practices, and cutting-edge technology. Our
          mission is to help developers grow their skills through clear, practical tutorials and
          insights from experienced professionals.
        </p>
        <p>
          Whether you're a beginner learning the basics or an experienced developer
          looking to level up, you'll find valuable content covering React, TypeScript, Node.js,
          cloud architecture, and more.
        </p>
      </section>
    </div>
  );
}
