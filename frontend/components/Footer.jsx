import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>TechBlog</h3>
          <p>
            TechBlog is a platform dedicated to sharing in-depth knowledge about modern web
            development, programming best practices, and cutting-edge technology. Our
            mission is to help developers grow their skills through clear, practical tutorials and
            insights from experienced professionals.
          </p>
          <p>
            Whether you're a beginner learning the basics or an experienced developer
            looking to level up, you'll find valuable content covering React, TypeScript, Node.js,
            cloud architecture, and more.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/admin">Admin Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <ul className="social-links">
            <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:contact@techblog.com">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 TechBlog. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
