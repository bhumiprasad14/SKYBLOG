import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📘</span>
          <span className="logo-text">TechBlog</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <Link to="/admin" className="nav-btn">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
