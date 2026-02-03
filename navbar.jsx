import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { theme } from "../styles/theme";

const useStyles = createUseStyles({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: "#020617",
    borderBottom: theme.border,
  },
  logo: { color: "white", fontSize: 22, fontWeight: 700 },
  links: {
    display: "flex",
    gap: 20,
    "& a": {
      color: theme.text,
      textDecoration: "none",
    },
  },
  btn: {
    background: `linear-gradient(90deg, ${theme.primary}, #2563eb)`,
    padding: "8px 14px",
    borderRadius: 8,
    color: "white",
    textDecoration: "none",
  },
});

export default function Navbar() {
  const c = useStyles();
  return (
    <div className={c.nav}>
      <div className={c.logo}>📘 SkyBlog</div>
      <div className={c.links}>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link className={c.btn} to="/admin">Admin Login</Link>
      </div>
    </div>
  );
}
