const React = window.React;
const ReactDOM = window.ReactDOM;

// Simple routing without react-router-dom (since we're using CDN)
function useLocation() {
  const [location, setLocation] = React.useState(window.location.pathname);
  
  React.useEffect(() => {
    const handlePopState = () => setLocation(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return location;
}

function navigate(path) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// Navbar Component
function Navbar() {
  return (
    React.createElement('nav', { className: 'navbar' },
      React.createElement('div', { className: 'navbar-container' },
        React.createElement('a', { href: '/', className: 'navbar-logo', onClick: (e) => { e.preventDefault(); navigate('/'); } },
          React.createElement('span', { className: 'logo-icon' }, '📘'),
          React.createElement('span', { className: 'logo-text' }, 'SkyBlog')
        ),
        React.createElement('div', { className: 'navbar-menu' },
          React.createElement('a', { href: '/', className: 'nav-link', onClick: (e) => { e.preventDefault(); navigate('/'); } }, 'Home'),
          React.createElement('a', { href: '/blogs', className: 'nav-link', onClick: (e) => { e.preventDefault(); navigate('/blogs'); } }, 'Blogs'),
          React.createElement('a', { href: '/admin', className: 'nav-btn', onClick: (e) => { e.preventDefault(); navigate('/admin'); } }, 'Admin Login')
        )
      )
    )
  );
}

// Footer Component
function Footer() {
  return React.createElement('footer', { className: 'site-footer' },
    React.createElement('div', { className: 'footer-container' },
      React.createElement('div', { className: 'footer-content' },
        React.createElement('h3', null, 'SkyBlog'),
        React.createElement('p', null, 'SkyBlog is a platform dedicated to sharing in-depth knowledge about modern web development, programming best practices, and cutting-edge technology.'),
        React.createElement('p', null, 'Whether\'re a beginner learning the basics or an experienced developer looking to level up, you\'ll find valuable content covering React, TypeScript, Node.js, and more.')
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'Quick Links'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); navigate('/'); } }, 'Home')),
          React.createElement('li', null, React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); navigate('/blogs'); } }, 'Blogs')),
          React.createElement('li', null, React.createElement('a', { href: '#', onClick: (e) => { e.preventDefault(); navigate('/admin'); } }, 'Admin Login'))
        )
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'Connect With Us'),
        React.createElement('ul', { className: 'social-links' },
          React.createElement('li', null, React.createElement('a', { href: 'https://github.com/', target: '_blank', rel: 'noopener noreferrer' }, 'GitHub')),
          React.createElement('li', null, React.createElement('a', { href: 'https://twitter.com/', target: '_blank', rel: 'noopener noreferrer' }, 'Twitter')),
          React.createElement('li', null, React.createElement('a', { href: 'https://linkedin.com/', target: '_blank', rel: 'noopener noreferrer' }, 'LinkedIn')),
          React.createElement('li', null, React.createElement('a', { href: 'mailto:contact@skyblog.com' }, 'Email'))
        )
      )
    ),
    React.createElement('div', { className: 'footer-bottom' },
      React.createElement('p', null, '© 2026 SkyBlog. All rights reserved.'),
      React.createElement('div', { className: 'footer-links' },
        React.createElement('a', { href: '#' }, 'Privacy Policy'),
        React.createElement('a', { href: '#' }, 'Terms of Service')
      )
    )
  );
}

// Home Page
function Home() {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      desc: "Learn how to set up a modern React application with TypeScript for type-safe development.",
      date: "January 28, 2026",
      tags: ["React", "TypeScript", "Web Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      desc: "Best practices for designing and implementing RESTful APIs that can handle production workloads.",
      date: "January 25, 2026",
      tags: ["Node.js", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Modern CSS Techniques with Tailwind",
      desc: "Explore utility-first CSS and how Tailwind CSS revolutionizes styling in modern web applications.",
      date: "January 22, 2026",
      tags: ["CSS", "Tailwind", "Frontend"],
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
    }
  ];

  return React.createElement('div', { className: 'home-container' },
    React.createElement('section', { className: 'hero-section' },
      React.createElement('div', { className: 'hero-content' },
        React.createElement('h1', null, 'Welcome to SkyBlog'),
        React.createElement('p', { className: 'hero-subtitle' }, 'Explore insights on modern web development, programming, and technology')
      )
    ),
    React.createElement('section', { className: 'author-section' },
      React.createElement('div', { className: 'author-card' },
        React.createElement('img', {
          src: 'https://images.unsplash.com/photo-1733231291506-34503f83f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          alt: 'Akash Banerjee',
          className: 'author-avatar'
        }),
        React.createElement('div', { className: 'author-info' },
          React.createElement('h2', null, 'Akash Banerjee'),
          React.createElement('p', { className: 'author-title' }, 'Full-stack Developer & Tech Writer'),
          React.createElement('p', { className: 'author-bio' }, 'Full-stack developer and tech writer with 8+ years of experience. Passionate about building scalable web applications and sharing knowledge through clear, practical tutorials. Specializing in React, Node.js, and cloud architecture.')
        )
      )
    ),
    React.createElement('section', { className: 'blogs-section' },
      React.createElement('h2', { className: 'section-title' }, 'Latest Articles'),
      React.createElement('div', { className: 'blogs-grid' },
        blogs.map(blog =>
          React.createElement('article', { key: blog.id, className: 'blog-card' },
            React.createElement('div', { className: 'card-image-wrapper' },
              React.createElement('img', { src: blog.image, alt: blog.title, className: 'card-image' })
            ),
            React.createElement('div', { className: 'card-content' },
              React.createElement('h3', null, blog.title),
              React.createElement('p', { className: 'card-description' }, blog.desc),
              React.createElement('div', { className: 'card-tags' },
                blog.tags.map((tag, idx) =>
                  React.createElement('span', { key: idx, className: 'tag' }, tag)
                )
              ),
              React.createElement('div', { className: 'card-footer' },
                React.createElement('span', { className: 'card-author' }, 'Admin'),
                React.createElement('span', { className: 'card-date' }, blog.date)
              ),
              React.createElement('a', {
                href: '#',
                className: 'read-more',
                onClick: (e) => { e.preventDefault(); navigate('/blog/' + blog.id); }
              }, 'Read More →')
            )
          )
        )
      )
    ),
    React.createElement('section', { className: 'about-section' },
      React.createElement('h2', null, 'About SkyBlog'),
      React.createElement('p', null, 'SkyBlog is a platform dedicated to sharing in-depth knowledge about modern web development, programming best practices, and cutting-edge technology. Our mission is to help developers grow their skills through clear, practical tutorials and insights from experienced professionals.'),
      React.createElement('p', null, 'Whether you\'re a beginner learning the basics or an experienced developer looking to level up, you\'ll find valuable content covering React, TypeScript, Node.js, cloud architecture, and more.')
    )
  );
}

// Blogs Page
function Blogs() {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      desc: "Learn how to set up a modern React application with TypeScript for type-safe development.",
      date: "January 28, 2026",
      tags: ["React", "TypeScript", "Web Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      desc: "Best practices for designing and implementing RESTful APIs that can handle production workloads.",
      date: "January 25, 2026",
      tags: ["Node.js", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Modern CSS Techniques with Tailwind",
      desc: "Explore utility-first CSS and how Tailwind CSS revolutionizes styling in modern web applications.",
      date: "January 22, 2026",
      tags: ["CSS", "Tailwind", "Frontend"],
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
    }
  ];

  return React.createElement('div', { className: 'blogs-container' },
    React.createElement('h1', null, 'All Articles'),
    React.createElement('p', { className: 'page-subtitle' }, 'Browse all our in-depth articles on web development'),
    React.createElement('div', { className: 'blogs-grid' },
      blogs.map(blog =>
        React.createElement('article', { key: blog.id, className: 'blog-card' },
          React.createElement('div', { className: 'card-image-wrapper' },
            React.createElement('img', { src: blog.image, alt: blog.title, className: 'card-image' })
          ),
          React.createElement('div', { className: 'card-content' },
            React.createElement('h3', null, blog.title),
            React.createElement('p', { className: 'card-description' }, blog.desc),
            React.createElement('div', { className: 'card-tags' },
              blog.tags.map((tag, idx) =>
                React.createElement('span', { key: idx, className: 'tag' }, tag)
              )
            ),
            React.createElement('div', { className: 'card-footer' },
              React.createElement('span', { className: 'card-author' }, 'Admin'),
              React.createElement('span', { className: 'card-date' }, blog.date)
            ),
            React.createElement('a', {
              href: '#',
              className: 'read-more',
              onClick: (e) => { e.preventDefault(); navigate('/blog/' + blog.id); }
            }, 'Read More →')
          )
        )
      )
    )
  );
}

// Admin Login Page
function AdminLogin() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin / admin123');
    }
  };

  return React.createElement('div', { className: 'admin-login-container' },
    React.createElement('div', { className: 'login-card' },
      React.createElement('h1', null, 'Admin Login'),
      React.createElement('form', { onSubmit: handleSubmit, className: 'login-form' },
        error && React.createElement('div', { className: 'error-message' }, error),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'username' }, 'Username'),
          React.createElement('input', {
            type: 'text',
            id: 'username',
            name: 'username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: 'Enter username',
            required: true
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'password' }, 'Password'),
          React.createElement('input', {
            type: 'password',
            id: 'password',
            name: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: 'Enter password',
            required: true
          })
        ),
        React.createElement('button', { type: 'submit', className: 'login-btn' }, 'Sign In')
      ),
      React.createElement('p', { className: 'demo-credentials' },
        'Demo: username: ', React.createElement('strong', null, 'admin'), ' | password: ', React.createElement('strong', null, 'admin123')
      )
    )
  );
}

// Dashboard Page
function Dashboard() {
  const [blogs, setBlogs] = React.useState([
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      desc: "Learn how to set up a modern React application with TypeScript for type-safe development.",
      date: "January 28, 2026",
      tags: ["React", "TypeScript", "Web Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Full content here"
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      desc: "Best practices for designing and implementing RESTful APIs that can handle production workloads.",
      date: "January 25, 2026",
      tags: ["Node.js", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Full content here"
    },
    {
      id: 3,
      title: "Modern CSS Techniques with Tailwind",
      desc: "Explore utility-first CSS and how Tailwind CSS revolutionizes styling in modern web applications.",
      date: "January 22, 2026",
      tags: ["CSS", "Tailwind", "Frontend"],
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Full content here"
    }
  ]);

  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    title: '',
    desc: '',
    content: '',
    date: '',
    tags: '',
    image: '',
    author: 'Akash Banerjee'
  });

  React.useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setBlogs(blogs.map(blog =>
        blog.id === editingId
          ? {
              ...blog,
              title: formData.title,
              desc: formData.desc,
              content: formData.content,
              date: formData.date,
              tags: formData.tags.split(',').map(t => t.trim()),
              image: formData.image
            }
          : blog
      ));
      setEditingId(null);
    } else {
      const newBlog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: formData.title,
        desc: formData.desc,
        content: formData.content,
        date: formData.date,
        tags: formData.tags.split(',').map(t => t.trim()),
        image: formData.image,
        author: 'Akash Banerjee'
      };
      setBlogs([newBlog, ...blogs]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      desc: '',
      content: '',
      date: '',
      tags: '',
      image: '',
      author: 'Akash Banerjee'
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
      tags: blog.tags.join(', '),
      image: blog.image,
      author: blog.author
    });
    setEditingId(blog.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  return React.createElement('div', { className: 'dashboard-container' },
    React.createElement('div', { className: 'dashboard-header' },
      React.createElement('h1', null, 'Admin Dashboard'),
      React.createElement('button', { onClick: handleLogout, className: 'logout-btn' }, 'Logout')
    ),
    React.createElement('div', { className: 'dashboard-content' },
      React.createElement('div', { className: 'toolbar' },
        !showForm && React.createElement('button', { onClick: () => setShowForm(true), className: 'add-blog-btn' }, '+ Add New Blog')
      ),
      showForm && React.createElement('div', { className: 'blog-form-container' },
        React.createElement('h2', null, editingId ? 'Edit Blog' : 'Create New Blog'),
        React.createElement('form', { onSubmit: handleSubmit, className: 'blog-form' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Title'),
            React.createElement('input', {
              type: 'text',
              name: 'title',
              value: formData.title,
              onChange: handleChange,
              placeholder: 'Blog title',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Description'),
            React.createElement('textarea', {
              name: 'desc',
              value: formData.desc,
              onChange: handleChange,
              placeholder: 'Short description',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Content'),
            React.createElement('textarea', {
              name: 'content',
              value: formData.content,
              onChange: handleChange,
              placeholder: 'Full blog content',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Image URL'),
            React.createElement('input', {
              type: 'url',
              name: 'image',
              value: formData.image,
              onChange: handleChange,
              placeholder: 'https://...',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Tags (comma separated)'),
            React.createElement('input', {
              type: 'text',
              name: 'tags',
              value: formData.tags,
              onChange: handleChange,
              placeholder: 'React, JavaScript, Web',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Date'),
            React.createElement('input', {
              type: 'text',
              name: 'date',
              value: formData.date,
              onChange: handleChange,
              placeholder: 'January 28, 2026',
              required: true
            })
          ),
          React.createElement('div', { className: 'form-actions' },
            React.createElement('button', { type: 'submit', className: 'submit-btn' }, editingId ? 'Update Blog' : 'Create Blog'),
            React.createElement('button', { type: 'button', onClick: resetForm, className: 'cancel-btn' }, 'Cancel')
          )
        )
      ),
      React.createElement('div', { className: 'blogs-list' },
        React.createElement('h2', null, 'All Blogs (' + blogs.length + ')'),
        React.createElement('table', { className: 'blogs-table' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Title'),
              React.createElement('th', null, 'Date'),
              React.createElement('th', null, 'Tags'),
              React.createElement('th', null, 'Actions')
            )
          ),
          React.createElement('tbody', null,
            blogs.map(blog =>
              React.createElement('tr', { key: blog.id },
                React.createElement('td', { className: 'title-cell' }, blog.title),
                React.createElement('td', null, blog.date),
                React.createElement('td', null,
                  React.createElement('div', { className: 'tag-list' },
                    blog.tags.map((tag, idx) =>
                      React.createElement('span', { key: idx, className: 'tag-badge' }, tag)
                    )
                  )
                ),
                React.createElement('td', { className: 'actions-cell' },
                  React.createElement('button', { onClick: () => handleEdit(blog), className: 'edit-btn' }, 'Edit'),
                  React.createElement('button', { onClick: () => handleDelete(blog.id), className: 'delete-btn' }, 'Delete')
                )
              )
            )
          )
        )
      )
    )
  );
}

// Blog Detail Page
function BlogDetail() {
  const pathname = window.location.pathname;
  const id = parseInt(pathname.split('/')[2]);

  const blogs = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      desc: "Learn how to set up a modern React application with TypeScript for type-safe development.",
      date: "January 28, 2026",
      tags: ["React", "TypeScript", "Web Development"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Learn how to set up a modern React application with TypeScript for type-safe development. This comprehensive guide covers project setup, component patterns, and best practices."
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      desc: "Best practices for designing and implementing RESTful APIs that can handle production workloads.",
      date: "January 25, 2026",
      tags: ["Node.js", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Best practices for designing and implementing RESTful APIs that can handle production workloads. Learn about architecture patterns, middleware, authentication, error handling, and optimization."
    },
    {
      id: 3,
      title: "Modern CSS Techniques with Tailwind",
      desc: "Explore utility-first CSS and how Tailwind CSS revolutionizes styling in modern web applications.",
      date: "January 22, 2026",
      tags: ["CSS", "Tailwind", "Frontend"],
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
      author: "Akash Banerjee",
      content: "Explore utility-first CSS and how Tailwind CSS revolutionizes styling. Learn about responsive design, component composition, theming, and optimization techniques."
    }
  ];

  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return React.createElement('div', { className: 'blog-detail-container' },
      React.createElement('p', { className: 'error' }, 'Blog not found'),
      React.createElement('a', {
        href: '#',
        className: 'back-link',
        onClick: (e) => { e.preventDefault(); navigate('/blogs'); }
      }, '← Back to blogs')
    );
  }

  return React.createElement('div', { className: 'blog-detail-container' },
    React.createElement('a', {
      href: '#',
      className: 'back-link',
      onClick: (e) => { e.preventDefault(); navigate('/blogs'); }
    }, '← Back to blogs'),
    React.createElement('article', { className: 'blog-detail' },
      React.createElement('header', { className: 'blog-header' },
        React.createElement('h1', null, blog.title),
        React.createElement('div', { className: 'blog-meta' },
          React.createElement('span', { className: 'author' }, 'By ' + blog.author),
          React.createElement('span', { className: 'date' }, blog.date)
        )
      ),
      React.createElement('img', { src: blog.image, alt: blog.title, className: 'blog-featured-image' }),
      React.createElement('div', { className: 'blog-tags' },
        blog.tags.map((tag, idx) =>
          React.createElement('span', { key: idx, className: 'tag' }, tag)
        )
      ),
      React.createElement('div', { className: 'blog-content' },
        React.createElement('p', null, blog.desc),
        React.createElement('p', null, blog.content)
      )
    )
  );
}

// Main App Component
function App() {
  const location = useLocation();

  return React.createElement('div', { id: 'app', style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' } },
    React.createElement(Navbar),
    location === '/' && React.createElement(Home),
    location === '/blogs' && React.createElement(Blogs),
    location === '/admin' && React.createElement(AdminLogin),
    location === '/dashboard' && React.createElement(Dashboard),
    location.startsWith('/blog/') && React.createElement(BlogDetail),
    location !== '/' && location !== '/blogs' && location !== '/admin' && location !== '/dashboard' && !location.startsWith('/blog/') && React.createElement(Home),
    React.createElement(Footer)
  );
}

// Render app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
