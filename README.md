# 🌤️ SkyBlog

SkyBlog is a secure and minimal blogging web application built with an **admin-controlled publishing system**. The platform allows only one authorized administrator to manage blog content, while all other users can view published posts without logging in.

---

## 📌 Features

- **Single Admin Access**
  - Only one administrator can log in using a predefined email ID and password.
  - Admin routes are protected from unauthorized access.

- **Full CRUD Functionality**
  - **Create** new blog posts  
  - **Read** existing posts  
  - **Update** posts  
  - **Delete** posts  

- **Public Viewing**
  - Visitors can browse and read all published blogs.
  - No authentication is required for viewers.

- **Secure Authentication**
  - Admin credentials are stored securely (recommended via environment variables).
  - Ensures only the authorized admin can modify content.

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Stack:** MERN (MongoDB, Express, React, Node.js)

---

## ⚙️ How It Works

1. The admin logs in with a registered email and password.
2. After successful authentication, the admin gains access to the dashboard.
3. The admin can perform CRUD operations on blog posts.
4. All published posts are instantly visible to the public.

---


