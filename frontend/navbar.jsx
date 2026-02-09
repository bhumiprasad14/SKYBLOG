import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./styles/navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📘</span>
          <span className="logo-text">SkyBlog</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/blogs" className="nav-link">
            Blogs
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin" className="nav-btn">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}