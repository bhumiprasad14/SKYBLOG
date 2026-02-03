import { createUseStyles } from "react-jss";
import { theme } from "../styles/theme";

const useStyles = createUseStyles({
  card: {
    background: theme.card,
    border: theme.border,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 40,
  },
  img: { width: "100%", height: 260, objectFit: "cover" },
  body: { padding: 24 },
  title: { color: "white", fontSize: 22 },
  desc: { color: theme.muted },
  tags: {
    display: "flex",
    gap: 10,
    marginTop: 10,
    "& span": {
      background: "#2e1065",
      color: theme.accent,
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 12,
    },
  },
});

export default function BlogCard({ blog }) {
  const c = useStyles();
  return (
    <div className={c.card}>
      <img src={blog.image} className={c.img} />
      <div className={c.body}>
        <h2 className={c.title}>{blog.title}</h2>
        <p className={c.desc}>{blog.desc}</p>
        <div className={c.tags}>
          {blog.tags.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
