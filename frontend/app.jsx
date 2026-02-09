import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./navbar";

import Home from "./pages/Home";

import Blogs from "./pages/Blogs";

import BlogDetail from "./pages/BlogDetail";

import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/Dashboard";

import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blogs" element={<Blogs />} />

          <Route path="/blog/:id" element={<BlogDetail />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/login" element={<AdminLogin />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}